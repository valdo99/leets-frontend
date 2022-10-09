import React, { useCallback, useReducer } from "react";
import { toast } from "react-toastify";

import {
  ValidationError,
  ForbiddenError,
  UnauthorizedError,
} from "@api/errors";

type FieldValue = string | boolean | File | File[] | null | number;

type FormData = {
  [key: string]: FieldValue | FormData;
};

type SubmitCallback<T extends FormData> = (data: T) => void;

type FormErrorsBase<T> = {
  [K in keyof T]?: T[K] extends FormData ? FormErrors<T[K]> : string;
};

type FormErrors<T> = FormErrorsBase<T> & {
  [key: string]: string;
};

interface FormState<T extends FormData> {
  values: T;
  errors: FormErrors<T>;
  disabled: boolean;
}

type FormAction<T> =
  | { type: "CHANGE_VALUE"; payload: { name: string; value: FieldValue } }
  | { type: "INIT_SUBMIT" }
  | { type: "SUBMIT_SUCCESS"; payload: { reset: boolean } }
  | { type: "SUBMIT_FAILURE"; payload?: { errors: FormErrors<T> } }
  | { type: "RESET"; payload: { values?: Partial<T> } };

type FormReducer<T extends FormData> = React.Reducer<
  FormState<T>,
  FormAction<T>
>;

const createFormReducer =
  <T extends FormData>(initialValues: T) =>
  (state: FormState<T>, action: FormAction<T>): FormState<T> => {
    switch (action.type) {
      case "CHANGE_VALUE": {
        const fields = action.payload.name.split(".");

        // Get what is the field to update (handling also nested objects)
        const fieldToUpdate = fields.reduce((obj, field) => {
          if (
            obj[field] &&
            typeof obj[field] === "object" &&
            !(obj[field] instanceof File) &&
            !Array.isArray(obj[field])
          ) {
            // Field is a nested fields
            return obj[field] as FormData;
          } else {
            return obj;
          }
        }, state.values as FormData);

        const lastKey = fields.pop();

        if (!lastKey) {
          return { ...state };
        }

        fieldToUpdate[lastKey] = action.payload.value;

        return {
          ...state,
          values: {
            ...state.values,
          },
        };
      }
      case "INIT_SUBMIT":
        return {
          ...state,
          disabled: true,
        };
      case "SUBMIT_SUCCESS":
        return {
          values: action.payload.reset ? initialValues : state.values,
          errors: {},
          disabled: false,
        };
      case "SUBMIT_FAILURE":
        return {
          ...state,
          errors: action.payload?.errors || {},
          disabled: false,
        };
      case "RESET": {
        let newValues;

        if (action.payload.values) {
          newValues = { ...state.values, ...action.payload.values };
        } else {
          newValues = initialValues;
        }

        return {
          ...state,
          values: newValues,
        };
      }
      default:
        return state;
    }
  };

interface Options {
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
}

export const useForm = <T extends FormData>(
  initialData: T,
  options: Options = {}
) => {
  const [formState, dispatch] = useReducer<FormReducer<T>>(
    createFormReducer(initialData),
    {
      values: initialData,
      errors: {},
      disabled: false,
    }
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = event.target;
    let value;

    if (event.target instanceof HTMLTextAreaElement) {
      value = event.target.value;
    } else if (type === "checkbox") {
      value = event.target.checked;
    } else if (type === "file" && event.target.files) {
      // Check if file is selected
      if (event.target.files.length === 0) {
        value = null;
      } else if (event.target.multiple) {
        // Multiple files are allowed to be selected
        const files = Array.from(event.target.files);

        // Check number of selected files is not more than maximum
        if (files.length > parseInt(event.target.max)) {
          value = null;
          event.target.value = "";

          // Add error for too many file selected
          dispatch({
            type: "SUBMIT_FAILURE",
            payload: {
              errors: {
                ...formState.errors,
                [name]: `Too many files, max is: ${event.target.max}`,
              },
            },
          });
        } else {
          value = files;
          const { [name]: fileError, ...rest } = formState.errors;

          // Remove error for too many files selected
          if (fileError) {
            dispatch({
              type: "SUBMIT_FAILURE",
              payload: {
                errors: rest as FormErrors<T>,
              },
            });
          }
        }
      } else {
        value = event.target.files[0];
      }
    } else {
      value = event.target.value;
    }

    dispatch({ type: "CHANGE_VALUE", payload: { name, value } });
  };

  const handleSubmit = (onSubmit: SubmitCallback<T>) => {
    return async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (formState.disabled) return;
      dispatch({ type: "INIT_SUBMIT" });

      try {
        await onSubmit(formState.values);
        dispatch({
          type: "SUBMIT_SUCCESS",
          payload: { reset: options.resetOnSuccess || false },
        });

        if (options.successMessage) {
          toast.success(options.successMessage);
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          dispatch({
            type: "SUBMIT_FAILURE",
            payload: { errors: err.data as FormErrors<T> },
          });
          return;
        }

        dispatch({ type: "SUBMIT_FAILURE" });

        // Skip because forbidden errors are handled globally
        if (err instanceof ForbiddenError || err instanceof UnauthorizedError) {
          return;
        }

        if (options.errorMessage) {
          toast.error(options.errorMessage);
        }
      }
    };
  };

  const reset = useCallback((values?: Partial<T>) => {
    dispatch({ type: "RESET", payload: { values } });
  }, []);

  return {
    formData: formState.values,
    handleChange,
    handleSubmit,
    reset,
    errors: formState.errors,
    disabled: formState.disabled,
  };
};
