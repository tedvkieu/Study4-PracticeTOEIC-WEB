import './CompleteToeic.scss';

import { useState } from 'react';

const CompleteToeic = (props) => {
    const [lessons, setLessons] = useState([
        { title: 'Từ vựng TOEIC', progress: 43 },
        { title: 'Ngữ Pháp TOEIC', progress: 70 },
        { title: 'Part 1: Photographs: Nghe Tranh', progress: 35 },
        { title: 'Part 2: Question - Response - Hỏi - đáp', progress: 22 },
        { title: 'Part 3: Conversations - Nghe hiểu đối thoại', progress: 43 },
        { title: 'Part 4: Talks - Nghe hiểu bài nói', progress: 43 },
        {
            title: 'Part 5: Incomplete Sentences - Điền từ vào câu',
            progress: 43,
        },
        {
            title: 'Part 6: Text Completion - Điền từ vào đoạn văn',
            progress: 43,
        },
        {
            title: 'Part 7: Reading Comprehension - Đọc hiểu văn bản',
            progress: 43,
        },
    ]);
    return (
        <>
            <h1 class="font-600 learncourse-heading" id="complete-toeic">
                Complete TOEIC
            </h1>
            <div className="content-block">
                <div className="main-course">
                    <div className="sp-item-title">
                        Complete TOEIC 750+
                        <span className="badge badge-success float-right">
                            Active
                        </span>
                        <span>
                            <a
                                className="far fa-edit"
                                data-toggle="modal"
                                data-target="#site-modal-md"
                                onclick="window.load_jqhtml(this, '#site-modal-md-content')"
                                data-href="/studyplan/63444/update/?view=clean"></a>
                        </span>
                    </div>
                    <div className="sp-item-description prewrap">
                        - Dành cho các bạn học viên target 650+ đã đăng ký khóa
                        Complete TOEIC của STUDY4 <br />- Thứ tự học từng kỹ
                        năng: chú ý CHỈ LUYỆN một part cho đến khi đạt tỉ lệ
                        đúng 70-80% rồi mới chuyển sang part khác. <br />
                        --- Listening: part 1 &gt; part 2 &gt; part 4 &gt; part
                        3 <br /> --------- Riêng part 3 và part 4, tập trung vào
                        dạng câu hỏi không cần suy luận: chủ đề, danh tính, địa
                        điểm, mục đích và bàng biểu.
                        <br /> --- Reading: part 5 &gt; part 6 &gt; part 7
                        --------- Part 7, tập trung vào bài đọc đơn, đọc ghép 2
                        câu hỏi. Dạng câu hỏi tìm thông tin: danh tính, thời
                        gian, địa điểm hoặc dạng tìm mục đích. - Chú ý không
                        luyện nhiều part của 1 kỹ năng cùng một lúc
                    </div>
                </div>
            </div>

            <h3 className="mt-3 heading-lesson">Danh sách bài học: </h3>
            {lessons.map((lesson, index) => (
                <div className="learncourse-unit" key={index}>
                    <div className="card-header">
                        <h4 className="learncourse-heading mb-0">
                            {lesson.title}
                        </h4>
                    </div>
                    <div className="card-body">
                        <div className="learncourse-progressbar">
                            <div className="mb-2">Bạn đã hoàn thành: </div>
                            <span className="progress-percent">
                                {lesson.progress}%
                            </span>
                            <div className="progress my-3">
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{
                                        width: `${lesson.progress}%`,
                                    }}></div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <a href="/courses/28/complete-toeic/learn/units/186/">
                            Xem tất cả &gt;&gt;
                        </a>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CompleteToeic;
