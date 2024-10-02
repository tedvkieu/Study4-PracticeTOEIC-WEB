import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { TbHeartPlus } from 'react-icons/tb';
import { BsFillPatchMinusFill } from 'react-icons/bs';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState();
    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>

            <div className="add-new-questions">
                <div className="col-6 form-group">
                    <label>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className="mt-3">Add Question:</div>
                <div>
                    <div className="questions-content">
                        <div className="form-floating description">
                            <input
                                type="type"
                                className="form-control"
                                placeholder="example@gmail.com"
                            />
                            <label>Description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-upload">Upload Img</label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className="btn-add">
                            <span>
                                <TbHeartPlus className="icon-add" />
                            </span>

                            <span>
                                <BsFillPatchMinusFill className="icon-remove" />
                            </span>
                        </div>
                    </div>

                    <div className="answers-content">
                        <input className="form-check-input iscorrect" type="checkbox" />
                        <div className="form-floating answer-name">
                            <input
                                type="type"
                                className="form-control"
                                placeholder="example@gmail.com"
                            />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-group">
                            <span>
                                <TbHeartPlus className="icon-add" />
                            </span>

                            <span>
                                <BsFillPatchMinusFill className="icon-remove" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;
