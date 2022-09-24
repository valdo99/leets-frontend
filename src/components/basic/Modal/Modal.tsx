import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import React, { Fragment, ReactNode } from "react";

import CloseIcon from "@icons/close.svg";

export interface BaseModalProps {
  show: boolean;
  onClose: () => void;
}

export interface ModalProps extends BaseModalProps {
  children: ReactNode;
  title?: string;
  closable?: boolean;
}

export const Modal = ({
  show,
  onClose,
  title,
  children,
  closable = true,
}: ModalProps) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closable ? onClose : () => undefined}
      >
        <div className="flex min-h-screen items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cx(
                "max-w-sm inline-block w-full py-6 px-5 sm:px-6 align-middle transition-all transform bg-base-200 shadow-xl rounded-btn mb-10"
              )}
            >
              <button
                className="absolute top-2 right-2 rounded-lg ring-primary/50 focus-visible:outline-none focus-visible:ring-2"
                onClick={onClose}
              >
                <CloseIcon className="h-6 w-6 text-base-content/50" />
              </button>
              {title && (
                <h3 className="mb-4 text-center text-xl font-bold">{title}</h3>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
