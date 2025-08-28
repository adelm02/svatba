import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./HomePage.css";
import { Button, Modal, Form } from "react-bootstrap";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { v4 as uuidv4 } from "uuid";
import pImage from "../assets/p.png";
import pImage2 from "../assets/a.png";
import Card from "./Card";

const API_URL = import.meta.env.VITE_API_URL;
function HomePage() {
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const load = () => {
      fetch(`${API_URL}/photos`)
        .then((r) => r.json())
        .then(setPhotos)
        .catch(console.error);
    };
    load(); // jednou hned
    const id = setInterval(load, 10000); // pak každých 10 s
    return () => clearInterval(id); // cleanup
  }, []);

  useEffect(() => {
    console.log(photos);
    photos.forEach((photo) => console.log("ID:", photo.name));
  }, [photos]);

  const photoCards = photos.map((photo) => ({
    key: `${photo.folder}-${photo.name}`,
    content: (
      <Card
        imagen={`${API_URL}/photo/${photo.folder}/${photo.name}`}
        onClick={setFullscreenImg}
      />
    ),
  }));

  console.log(photoCards)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos]);

  const handleStartQuiz = () => {
    const saved = localStorage.getItem("username");
    if (saved) {
      navigate("/quiz");
    } else {
      setShow(true);
    }
  };

  const handleSave = () => {
    if (name.length > 0) {
      localStorage.setItem("username", name);
      navigate("/quiz");
    }
  };
  console.log(photoCards)
  return (
    <div>
      <div className="carousel-section">
        {photos.length === 0 ? (
          <p>Načítám fotky...</p>
        ) : (
          <div
            style={{
              width: "30%",
              height: "500px",
              margin: "0 auto",
            }}
          >
            <Carousel
              slides={photoCards}
              goToSlide={currentSlide}
              offsetRadius={2}
              showNavigation={false}
              animationConfig={config.gentle}
            />
            {fullscreenImg && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
                onClick={() => setFullscreenImg(null)}
              >
                <img
                  src={fullscreenImg}
                  alt="fullscreen"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    borderRadius: "20px",
                    boxShadow: "0 0 40px #000",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="content-section">
        <hr className="line"></hr>
        <h1 className="wedding-heading">
          ADÉLKA & PETR
          <br />
          HŘÍBKOVI
        </h1>

        <label className="button">
          Přidat svatební fotky 💍
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (!files.length) return;

              Array.from(files).forEach((file) => {
                const formData = new FormData();
                formData.append("photo", file);

                fetch(`${API_URL}/upload_wedding`, {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data)
                    setPhotos([...photos, { ...data }])
                    console.log(photos)
                  })
                  .catch((err) => console.error("Chyba při odesílání", err));
              });
            }}
            multiple
            style={{ display: "none" }}
          />
        </label>

        <label className="button">
          Vtipné fotky z minulosti
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (!files.length) return;

              Array.from(files).forEach((file) => {
                const formData = new FormData();
                formData.append("photo", file);

                fetch(`${API_URL}/upload_funny`, {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((data) => setPhotos([...photos, { ...data }]))
                  .catch((err) => console.error("Chyba při odesílání", err));
              });
            }}
            multiple
            style={{ display: "none" }}
          />
        </label>
      </div>
      <>
        <button className="button" onClick={handleStartQuiz}>
          Spustit svatební kvíz 🤍
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="text" closeButton>
            {" "}
            Zadej  své  jméno{" "}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="cudlikyQuiz">
            <Button className="cudlik" variant="secondary" onClick={handleSave}>
              Potvrdit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default HomePage;
