"use client"
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './css/ToastAnimations.css'; // Додаємо файл CSS для анімацій
import { CommonComponentChildren } from '@/types';
import { ToastContext, useToastModel } from './models/useToast';
 
export const ToastProvider = ({ children }:CommonComponentChildren) => {
    const { closeToast, showToast, toasts} = useToastModel();
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer position="bottom-center" className="p-3" style={{position:'fixed'}}>
                <TransitionGroup>
                    {toasts.map((toast) => (
                        <CSSTransition
                            key={toast.id}
                            timeout={300}
                            classNames="toast"
                            // передаємо nodeRef
                            nodeRef={toast.nodeRef}>
                            <Toast  
                                ref={toast.nodeRef} // встановлюємо ref для Toast
                                className={`bg-${toast.type} text-white rounded border-${toast.type} mb-2`}
                                onClose={() => closeToast(toast.id)}
                                show={true}
                                autohide
                                delay={5000}>

                                <Toast.Body className="d-flex justify-content-between">
                                    <div>
                                        {toast.icon}
                                        {toast.message}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white text-white"
                                        onClick={() => closeToast(toast.id)}
                                    ></button>
                                </Toast.Body>
                            </Toast>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ToastContainer>
        </ToastContext.Provider>
    );
};
