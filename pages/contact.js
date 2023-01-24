import {
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  ChakraProvider,
  useToast,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import s from "../styles/contact.module.css";
import { sendContactForm } from "../mailConfig/contactApi";
import Head from "next/head";

const initValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};
const initState = { isLoading: false, error: "", values: initValues };
const contact = () => {
  const toast = useToast();
  const [value, setValue] = useState(initState);
  const [focused, setFocused] = useState({});

  const { values, isLoading, error } = value;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValidEmail = (email) => emailRegex.test(email);

  const onBlur = ({ target }) =>
    setFocused((prev) => ({ ...prev, [target.name]: true }));
  const handleChange = ({ target }) =>
    setValue((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  const onSubmit = async () => {
    if (!isValidEmail(values.email)) {
      setValue((prev) => ({
        ...prev,
        error: "Please enter a valid email address.",
      }));
      return;
    } else if (values.phone.length < 7) {
      setValue((prev) => ({
        ...prev,
        error: "Please enter a valid phone number.",
      }));
      return;
    } else {
      setValue((prev) => ({
        ...prev,
        isLoading: true,
      }));
      try {
        await sendContactForm(values);
        setFocused({});
        setValue(initState);
        toast({
          render: () => (
            <Box color="white" textAlign={"center"} p={3} bg="black">
              Message sent.
            </Box>
          ),
          status: "Success",
          duration: 5000,
          position: "top",
        });
      } catch (error) {
        setValue((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      }
    }
  };

  return (
    <>
      <Head>
        <title>QWERTY - Contact Us</title>
      </Head>
      <ChakraProvider className={s.container}>
        <Container className={`${s.contactCon}`}>
          <Heading style={{ fontSize: "40px" }}>Contact Us</Heading>
          {error && (
            <Text color="red.300" my={4} fontSize="xl">
              {error}
            </Text>
          )}

          <Container className={s.formCon}>
            <FormControl isRequired isInvalid={focused.name && !values.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                className={s.contactInput}
                type="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={onBlur}
                errorBorderColor="red.300"
              />
              <FormErrorMessage>Full name is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={focused.email && !isValidEmail(values.email)}
            >
              <FormLabel>Email</FormLabel>
              <Input
                className={s.contactInput}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={onBlur}
              ></Input>
              <FormErrorMessage>Email is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={focused.phone && values.phone.length < 7}
            >
              <FormLabel>Phone number</FormLabel>
              <Input
                className={s.contactInput}
                type="number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={onBlur}
              ></Input>
              <FormErrorMessage>Phone number is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={focused.subject && !values.subject}
            >
              <FormLabel>Subject</FormLabel>
              <Input
                className={s.contactInput}
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={onBlur}
              ></Input>
              <FormErrorMessage>Subject is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={focused.message && !values.message}
            >
              <FormLabel>Message</FormLabel>
              <Textarea
                className={s.contactInputText}
                type="text"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={onBlur}
              ></Textarea>
              <FormErrorMessage>Message is required</FormErrorMessage>
            </FormControl>
            <Button
              className={s.submitBtn}
              type="submit"
              disabled={
                !values.name ||
                !values.email ||
                !values.phone ||
                !values.subject ||
                !values.message
              }
              onClick={onSubmit}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Container>
        </Container>
      </ChakraProvider>
    </>
  );
};

export default contact;
