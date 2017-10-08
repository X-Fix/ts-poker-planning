import React from 'react';

const ModalWrapper = ({ isOpen, onClose, title, children }) => {

	const modalClassName = "modal" + (isOpen ? " open" : "");

	return (
		<div className={modalClassName}>
			<div className="modal__backdrop">
				<div className="modal__container">
					<div className="modal__title">{title}</div>
					<div className="modal__close-button glyph remove" onClick={onClose} />
					<div className="modal__content">
						{children}
					</div>
				</div>
			</div>
		</div>
	);

}

export default ModalWrapper;