import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Portal } from "react-portal";
import { ModalContext } from "./ModalContext";

export const ModalOverlay = ({ children }) => {
  return <div className="fixed w-screen h-screen top-0 left-0">{children}</div>;
};

export const ModalContent = ({ children }) => {
  return (
    <div className="flex flex-col relative w-full outline-0">{children}</div>
  );
};

export const ModalHeader = ({ children }) => {
  return <div className="flex flex-0">{children}</div>;
};

export const Modal = () => {
  const { isOpen, toggle, onOpen, onClose } = useContext(ModalContext);
  return isOpen ? (
    <Portal>
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              //onClick=()
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>Hello, I'm a modal.</p>
        </div>
      </div>
    </Portal>
  ) : null;
};
