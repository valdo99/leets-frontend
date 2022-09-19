import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import classNames from "classnames";

const Modal = ({
  show,
  onClose,
  title,
  size = "medium",
  children,
  closable = true,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closable ? onClose : () => undefined}
      >
        <div className="min-h-screen px-4 flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
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
              className={classNames(
                "bg-gray-900 inline-block w-full py-6 px-5 sm:px-6 align-middle transition-all transform border-gray-500 rounded-2xl mb-10",
                size === "large" ? "max-w-3xl" : "max-w-md"
              )}
            >
              {title && (
                <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;