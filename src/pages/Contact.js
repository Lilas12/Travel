import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import kontakt from "../assets/images/kontakt.png";
import { BsHeadphones, BsPerson } from "react-icons/bs";
import house from "../assets/images/lighthouse.png";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 80px;
  border-radius: 8px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 25px;
  font-family: "Noto Sans Sora Sompeng";
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: 4px solid #bb8c98;
`;
const Container = styled.div`
  position: relative;
  background-image: url(${kontakt});
  background-size: 100%;
  background-position: center;
  background-attachment: fixed;
  height: 90vh;
  margin-top: 100px;

  @media (max-width: 768px) {
    height: 70vh;
    background-size: 150%;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ImageText = styled.div`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
  line-height: 40px;
  max-width: 80%;
  margin: 0 auto;
  font-weight: bold;
`;

const Styledrubrik = styled.h1`
  font-size: 30px;
  text-align: center;
  padding: -4px;
  font-family: "Noto Sans Sora Sompeng";
  color: #1f2041;
`;

const StyledDes = styled.p`
  font-size: 25px;
  text-align: center;
  padding: -2px;
  margin-top: 1%;
  padding: -2px;
  font-family: "Inter";
  color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const StyledTextArea = styled.textarea`
  border: 4px solid #bb8c98;
  width: 100%;
  padding: 12px;
  font-size: 16px;

  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Button = styled.button`
  background-color: #bb8c98;
  color: #000;
  padding: 10px 50px;
  text-decoration: none;
  font-weight: 700;
  font-family: "Noto Sans Sora Sompeng";
  margin-bottom: 30px;
  border: 4px solid #bb8c98;

  display: inline-block;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transform: scale(1.2);
  }
`;

function Contact() {
  const data = [
    {
      description: "Best Travel Guide Always for your Services",
      icon: <BsPerson />,
      color: "pink",
    },

    {
      description: "24/7 Strong Customer Support",
      icon: <BsHeadphones />,
      color: "rosa",
    },
  ];

  const initialValues = {
    username: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState({});
  const [btnSubmit, setBtnSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation(formValues));
    setBtnSubmit(true);

    if (Object.keys(error).length === 0) {
      emailjs
        .sendForm(
          "service_9bs5ffm",
          "template_lbebtqc",
          event.target,
          "dM70lb3dxTelZhfez"
        )
        .then(
          (response) => {
            console.log(
              "Email sent successfully!",
              response.status,
              response.text
            );
          },
          (error) => {
            console.error("Email could not be sent.", error);
          }
        );

      setFormValues(initialValues);
    }
  };

  const validation = (values) => {
    const formErrors = {};

    if (!values.username) {
      formErrors.username = "Please fill out this field";
    }

    if (!values.email) {
      formErrors.email = "Please fill out this field";
    }

    if (!values.message) {
      formErrors.message = "Please fill out this field";
    }

    return formErrors;
  };

  return (
    <>
      <Container>
        <ImageOverlay>
          <ImageText>
            <p>
              "If you have any questions about your trip, please feel free to
              contact us."
            </p>
          </ImageText>
        </ImageOverlay>
      </Container>
      <FormContainer>
        <Styledrubrik>
          <h1>Contact Us</h1>
        </Styledrubrik>

        <form onSubmit={handleSubmit}>
          <Label type="name">Name</Label>

          <Input
            required
            type="text"
            name="username"
            placeholder="Name"
            value={formValues.username}
            onChange={handleChange}
          />
          <Label type="email">Email</Label>
          <Input
            required
            type="email"
            name="email"
            placeholder="Ex@example.com"
            value={formValues.email}
            onChange={handleChange}
          />
          <p>{error.email}</p>
          <Label type="text">Ask Your Question</Label>
          <StyledTextArea
            required
            type="text"
            name="message"
            placeholder="Write to us"
            value={formValues.message}
            onChange={handleChange}
          />
          <p>{error.message}</p>
          <ButtonContainer>
            <Button type="submit">Send</Button>
          </ButtonContainer>
          {Object.keys(error).length === 0 && btnSubmit ? (
            <StyledDes>
              <p>"Thank you, we will get back to you shortly."</p>
            </StyledDes>
          ) : (
            <p></p>
          )}
        </form>
      </FormContainer>

      <TravelSection id="offer">
        <ImageContainer>
          <img src={house} alt="house" />
        </ImageContainer>
        <Content>
          <div className="title">
            <h1>We offer a wide range of travel experiences worldwide.</h1>
          </div>
          <List className="list">
            {data.map(({ description, icon, color }) => (
              <ListItem key={description}>
                <Icon className={color}>{icon}</Icon>
                <Text>
                  <h3>{description}</h3>
                </Text>
              </ListItem>
            ))}
          </List>
        </Content>
      </TravelSection>
    </>
  );
}

export default Contact;

const TravelSection = styled.section`
  background-color: #ede9ed;
  display: flex;
  margin: 8px 0;
  gap: 5rem;
  margin-bottom: -10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 1rem;

  @media screen and (min-width: 270px) and (max-width: 1070px) {
    flex-direction: column;
    margin: 5rem 1rem;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  img {
    height: 39rem;

    @media screen and (min-width: 270px) and (max-width: 1070px) {
      max-inline-size: 100%;
      block-size: auto;
    }
  }
`;

const Content = styled.div`
  .title {
    margin: 2px;

    h1 {
      font-size: 40px;

      @media screen and (min-width: 270px) and (max-width: 1070px) {
        font-size: 2rem;
        text-align: center;
      }
    }
  }
`;

const List = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin: 4rem 0;

  @media screen and (min-width: 270px) and (max-width: 1070px) {
    gap: 1rem;
    margin: 2rem 0;
  }
`;

const Icon = styled.div`
  padding: 0.9rem;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;

  &.pink {
    background-color: #bb8c98;
    color: #000;
  }

  &.rosa {
    background-color: #bb8c98;
    color: #fff;
  }
`;

const Text = styled.div`
  h3 {
    font-size: 2rem;

    @media screen and (min-width: 270px) and (max-width: 1070px) {
      font-size: 2rem;
    }
  }
`;