import React, { useState } from 'react';
import { invoke } from '@forge/bridge';

function ServiceRequestPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage('제목과 내용을 모두 입력해주세요.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await invoke('createServiceDeskRequest', {
        title: formData.title,
        content: formData.content
      });

      if (response.success) {
        setMessage(`서비스 요청이 성공적으로 생성되었습니다. (ID: ${response.issueKey})`);
        setMessageType('success');
        setFormData({ title: '', content: '' });
      } else {
        setMessage(response.message || '서비스 요청 생성 중 오류가 발생했습니다.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error creating service desk request:', error);
      setMessage('서비스 요청 생성 중 오류가 발생했습니다.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ title: '', content: '' });
    setMessage('');
    setMessageType('');
  };

  return (
    <section className="page-content">
      <div className="page-header">
        <h2>Service Request</h2>
        <p>서비스 요청 및 지원을 받을 수 있습니다.</p>
      </div>

      <div className="service-request-container">
        <div className="service-request-form">
          <h3>새 서비스 요청</h3>
          <p className="form-description">
            문제사항이나 요청사항을 작성해주시면 담당자가 빠르게 처리해드립니다.
          </p>

          {message && (
            <div className={`message-alert ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">제목 *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="요청사항의 제목을 입력하세요"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">내용 *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="요청사항의 상세 내용을 입력하세요"
                rows="8"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    전송 중...
                  </>
                ) : (
                  <>
                    <span className="icon">📤</span>
                    전송
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="reset-btn"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                <span className="icon">🔄</span>
                초기화
              </button>
            </div>
          </form>
        </div>

        <div className="service-request-info">
          <h4>📋 서비스 요청 안내</h4>
          <ul>
            <li>• 긴급한 사항의 경우 전화로 먼저 연락 부탁드립니다.</li>
            <li>• 요청사항은 업무시간 내에 처리됩니다.</li>
            <li>• 처리 현황은 이메일로 안내드립니다.</li>
            <li>• 기술적 문제는 가능한 상세히 작성해주세요.</li>
          </ul>
          
          <div className="contact-info">
            <h5>📞 긴급 연락처</h5>
            <p>IT 지원팀: 02-1234-5678</p>
            <p>운영시간: 평일 09:00 ~ 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceRequestPage;