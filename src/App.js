import React, { useState, useEffect } from 'react';

const containerStyle = {
  maxWidth: '700px',
  margin: '40px auto',
  padding: '20px',
  background: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  fontFamily: 'Montserrat, sans-serif',
};

const buttonStyle = {
  display: 'block',
  width: '80%',
  margin: '15px auto',
  padding: '15px',
  border: 'none',
  borderRadius: '30px',
  fontSize: '16px',
  color: '#ffffff',
  backgroundColor: '#1d57a6',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
};

const h2Style = {
  color: '#1d57a6',
  fontSize: '24px',
  marginBottom: '20px',
};

const pStyle = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '20px',
};

const languageTests = {
  Anglais: [
    { question: 'Comment traduisez-vous "Bonjour" en anglais ?', options: ['Hello', 'Goodbye', 'Thanks'], answer: 'Hello' },
    { question: 'Complétez : "I ___ a book."', options: ['read', 'reads', 'reading'], answer: 'read' },
    { question: 'Quel est le pluriel de "child" en anglais ?', options: ['children', 'childs', 'childeren'], answer: 'children' },
  ],
  Espagnol: [
    { question: 'Comment traduisez-vous "Bonjour" en espagnol ?', options: ['Hola', 'Adiós', 'Gracias'], answer: 'Hola' },
    { question: 'Complétez : "Yo ___ un libro."', options: ['leo', 'lees', 'lee'], answer: 'leo' },
    { question: 'Quel est le pluriel de "libro" ?', options: ['libros', 'libres', 'libre'], answer: 'libros' },
  ],
  Allemand: [
    { question: 'Comment traduisez-vous "Bonjour" en allemand ?', options: ['Guten Morgen', 'Auf Wiedersehen', 'Danke'], answer: 'Guten Morgen' },
    { question: 'Complétez : "Ich ___ ein Buch."', options: ['lese', 'liest', 'lesen'], answer: 'lese' },
    { question: 'Quel est le pluriel de "Buch" ?', options: ['Bücher', 'Buchs', 'Bücheren'], answer: 'Bücher' },
  ],
  Français: [
    { question: 'Comment écrivez-vous le nombre 5 en français ?', options: ['cinq', 'six', 'sept'], answer: 'cinq' },
    { question: 'Complétez : "Je ___ un livre."', options: ['lis', 'lit', 'lisons'], answer: 'lis' },
    { question: 'Quel est le pluriel de "cheval" ?', options: ['chevaux', 'chevals', 'chevales'], answer: 'chevaux' },
  ],
};

const testsData = {
  Langues: [],
  Bureautique: [
    { question: 'Quelle formule Excel additionne des cellules ?', options: ['=ADD()', '=SUM()', '=PLUS()'], answer: '=SUM()' },
    { question: 'Quel est le raccourci pour copier (Ctrl + ___) ?', options: ['V', 'C', 'X'], answer: 'C' },
    { question: 'Quelle extension correspond à un fichier Excel ?', options: ['.xlsx', '.docx', '.pptx'], answer: '.xlsx' },
    { question: 'Que fait le raccourci Ctrl + Z ?', options: ['Annuler', 'Copier', 'Coller'], answer: 'Annuler' },
    { question: 'Dans Word, que signifie "justifier un texte" ?', options: ['Aligner à gauche et à droite', 'Mettre en gras', 'Souligner'], answer: 'Aligner à gauche et à droite' },
    { question: 'Que fait la fonction VLOOKUP ?', options: ['Recherche verticale', 'Filtrage automatique', 'Ajoute des colonnes'], answer: 'Recherche verticale' },
    { question: 'PowerPoint : quelle vue permet de voir toutes les diapositives ?', options: ['Trieuse', 'Lecture', 'Mode Notes'], answer: 'Trieuse' },
  ]
};

function shuffleOptions(options) {
  const filtered = options.filter(opt => opt !== 'Je ne sais pas');
  return [...filtered.sort(() => Math.random() - 0.5), 'Je ne sais pas'];
}

export default function App() {
  const [sector, setSector] = useState('');
  const [language, setLanguage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (sector && sector !== 'Langues') {
      const prepared = testsData[sector].map(q => ({
        ...q,
        options: shuffleOptions([...q.options, 'Je ne sais pas'])
      }));
      setQuestions(prepared);
    }
    if (sector === 'Langues' && language) {
      const prepared = languageTests[language].map(q => ({
        ...q,
        options: shuffleOptions([...q.options, 'Je ne sais pas'])
      }));
      setQuestions(prepared);
    }
  }, [sector, language]);

  const handleAnswer = (selected) => {
    if (questions[currentQuestion].answer === selected) {
      setScore(prev => prev + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!sector) {
    return (
      <div style={containerStyle}>
        <h2 style={h2Style}>Choisissez un secteur pour commencer</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(testsData).map(sec => (
            <button key={sec} onClick={() => setSector(sec)} style={buttonStyle}>{sec}</button>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div style={containerStyle}>
        <h2 style={h2Style}>Résultat</h2>
        <p style={pStyle}>Votre score : {score} / {questions.length}</p>
        <p style={pStyle}>Niveau : {score <= Math.floor(questions.length / 3) ? 'Débutant' : score < questions.length - 2 ? 'Intermédiaire' : 'Avancé'}</p>
        <button onClick={() => {
          setSector('');
          setLanguage('');
          setCurrentQuestion(0);
          setScore(0);
          setQuestions([]);
          setShowResult(false);
        }} style={buttonStyle}>Refaire un test</button>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div style={containerStyle}>
      <h2 style={h2Style}>{(language || sector)} - Question {currentQuestion + 1}</h2>
      <p style={pStyle}>{current.question}</p>
      {current.options.map(option => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          style={buttonStyle}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
