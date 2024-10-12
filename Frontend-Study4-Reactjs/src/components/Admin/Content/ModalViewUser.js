import './ModalViewUser.scss';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const [email, setEmail] = useState('');

    const [username, setUsername] = useState('');

    const [role, setRole] = useState('USER');
    const [previewImg, setPreviewImg] = useState('');

    useEffect(() => {
        console.log('run effect ', dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            if (dataUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setEmail('');

        setUsername('');
        setRole('USER');
        setPreviewImg('');
        props.resetUpdateData();
    };

    return (
        <>
            <Modal
                className="modal-add-user"
                size="xl"
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>View a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container mt-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="card p-3 py-4">
                                    <div className="text-center">
                                        {previewImg ? (
                                            <img
                                                src={previewImg}
                                                width="100"
                                                className="rounded-circle"
                                                alt="no file"
                                            />
                                        ) : (
                                            <span> Preview Image</span>
                                        )}
                                    </div>

                                    <div className="text-center mt-3">
                                        <span className="bg-secondary p-1 px-4 rounded text-white">
                                            {role}
                                        </span>
                                        <h5 className="mt-2 mb-0">
                                            {username}
                                        </h5>
                                        <div className="px-4 mt-1">
                                            <span>{email}</span>
                                        </div>
                                        <span>UI/UX Designer</span>

                                        <div className="px-4 mt-1">
                                            <p className="fonts">
                                                Consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat.
                                            </p>
                                        </div>

                                        <ul className="social-list">
                                            <li>
                                                <i className="fa fa-facebook"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-dribbble"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-instagram"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-linkedin"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-google"></i>
                                            </li>
                                        </ul>

                                        <div className="buttons">
                                            <button className="btn btn-outline-primary px-4">
                                                Message
                                            </button>
                                            <button className="btn btn-primary px-4 ms-3">
                                                Contact
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button
                        variant="primary"
                        onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewUser;
