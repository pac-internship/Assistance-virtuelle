import { useEffect, useState } from 'react';

type Question = {
  id: number;
  content: string;
  children: Question[];
};

const FAQ = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>FAQ</h1>
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))
      ) : (
        <p>Chargement des questions...</p>
      )}
    </div>
  );
};

type QuestionItemProps = {
  question: Question;
};

const QuestionItem = ({ question }: QuestionItemProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {question.content}
      </div>
      {question.children.length > 0 && (
        <div style={{ marginLeft: '20px', marginTop: '10px' }}>
          {question.children.map((child) => (
            <div key={child.id} style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '16px', color: 'gray' }}>
                {child.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQ;
