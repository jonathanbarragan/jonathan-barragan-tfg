import React, { useState, useEffect } from 'react';
import "./Profile.css";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    } else {
      // Redirigir a la página de login si no hay usuario en localStorage
      navigate("/Login");
    }
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('user');
      navigate("/");
    }).catch((error) => {
      console.error('Error al realizar sign out:', error);
    });
  };

  return (
    <div className="profile-container">
      {userData ? (
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <div className="profile-card">
                <h2 className="text-center">Perfil de {userData.displayName}</h2>
                <div className="profile-info">
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Dirección:</strong> {userData.address || 'No especificada'}</p>
                  <p><strong>Ciudad:</strong> {userData.city || 'No especificada'}</p>
                </div>
                <Button onClick={handleSignOut} variant="danger" className="mt-3">Cerrar sesión</Button>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <p className="text-center">Cargando...</p>
      )}
    </div>
  );
}
