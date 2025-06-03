import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Navbar, Nav, Form, Row, Col } from 'react-bootstrap';

function App() {
  const [writers] = useState([
    {
      fullName: 'Victor Hugo',
      bio: 'Auteur de "Les Misérables".. Né le 26 février 1802 à Besançon et mort le 22 mai 1885 à Paris, Victor Hugo est un des plus illustres écrivains français. Poète, dramaturge et romancier de génie, mais aussi homme politique, journaliste, dessinateur ou encore décorateur, Victor Hugo a marqué la vie littéraire, artistique et politique de son temps.',
      imgSrc: '/victor-hugo.jpg',
      profession: 'Écrivain',
    },
    {
      fullName: 'George Sand',
      bio: 'Romancière française du XIXe siècle. George Sand était une écrivaine française née le 1er juillet 1804 à Paris et décédée le 8 juin 1876 à Nohant-Vic. Capable d’écrire tous types de littérature, du roman à la pièce de théâtre en passant par la poésie, elle est l’un des auteurs les plus prolifiques du XIXe siècle en France, avec notamment 70 romans publiés de son vivant.',
      imgSrc: '/george-sand.jpg',
      profession: 'Romancière',
    },
    {
      fullName: 'Albert Camus',
      bio: 'Auteur de "L’Étranger", prix Nobel. Albert Camus (1913-1960) était un écrivain, philosophe et essayiste français, né à Mondovi en Algérie. Il est connu pour son œuvre littéraire et philosophique qui explore les thèmes de l\'absurdité de la condition humaine, de la révolte et de l\'engagement moral. Il a reçu le Prix Nobel de littérature en 1957.',
      imgSrc: '/albert-camus.jpg',
      profession: 'Philosophe',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // États pour formulaire
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (show) setIsPlaying(true);
    else setIsPlaying(false);
  }, [show]);

  useEffect(() => {
    let autoInterval;
    if (isPlaying && show) {
      autoInterval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % writers.length);
      }, 3000);
    }
    return () => clearInterval(autoInterval);
  }, [isPlaying, show, writers.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setName('');
    setMessage('');
  };

  return (
    <div
      className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#">Etat React</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Accueil</Nav.Link>
              <Nav.Link href="#">Produits</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenu principal */}
      <Container className="text-center mt-5 flex-grow-1">
        <h1>Profil Personnage</h1>

        <Button variant="secondary" onClick={() => setShow(prev => !prev)}>
          {show ? 'Cacher le profil' : 'Afficher le profil'}
        </Button>

        <Button
          variant={isPlaying ? 'danger' : 'success'}
          className="ms-2"
          onClick={() => setIsPlaying(prev => !prev)}
          disabled={!show}
        >
          {isPlaying ? 'Pause' : 'Lecture'}
        </Button>

        <Button
          variant={darkMode ? 'light' : 'dark'}
          className="ms-2"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? 'Mode Clair' : 'Mode Sombre'}
        </Button>

        {show && (
          <Card
  bg={darkMode ? 'dark' : ''}
  text={darkMode ? 'light' : ''}
  style={{
    maxWidth: '400px',
    maxHeight: '500px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}
  className="shadow-lg"
>
            <Card.Img
  variant="top"
  src={writers[currentIndex].imgSrc}
  style={{ height: '160px', objectFit: 'contain', padding: '10px' }}
/>
      <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div>
    <Card.Title>{writers[currentIndex].fullName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{writers[currentIndex].profession}</Card.Subtitle>
    <Card.Text style={{ fontSize: '0.85rem', maxHeight: '150px', overflowY: 'auto' }}>
      {writers[currentIndex].bio}
    </Card.Text>
  </div>

  <Button
    variant={darkMode ? 'light' : 'primary'}
    onClick={() => setCurrentIndex((currentIndex + 1) % writers.length)}
    className="mt-3"
  >
    Suivant
  </Button>
</Card.Body>

          </Card>
        )}

        <p className="mt-4">Temps depuis le montage : {time} secondes</p>

        {/* Formulaire de contact */}
        <h2>Contactez-nous</h2>
        <Form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '20px auto' }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={darkMode ? 'bg-secondary text-light' : ''}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Votre message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={darkMode ? 'bg-secondary text-light' : ''}
            />
          </Form.Group>
          <Button variant="success" type="submit">Envoyer</Button>
          {formSubmitted && <p className="mt-3 text-success">Merci pour votre message !</p>}
        </Form>
      </Container>

      {/* Footer */}
      <footer className={`mt-5 pt-4 pb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Container className="text-center">
          <Row className="mb-3">
            <Col>
              <a href="https://facebook.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-facebook fa-lg me-3 ${darkMode ? 'text-light' : 'text-dark'}`}></i>
              </a>
              <a href="https://twitter.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-twitter fa-lg me-3 ${darkMode ? 'text-light' : 'text-dark'}`}></i>
              </a>
              <a href="https://instagram.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-instagram fa-lg me-3 ${darkMode ? 'text-light' : 'text-dark'}`}></i>
              </a>
              <a href="https://www.paypal.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-paypal fa-lg me-3 ${darkMode ? 'text-light' : 'text-dark'}`}></i>
              </a>
              <a href="mailto:contact@monsite.com" className="text-light">
                <i className={`fas fa-envelope fa-lg ${darkMode ? 'text-light' : 'text-dark'}`}></i>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="mb-0">&copy; {new Date().getFullYear()} Mon Projet Action React — Tous droits réservés.</p>
              <small>
                <a href="/mentions-legales" className="text-secondary text-decoration-none">
                  Mentions légales
                </a>
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
