// import React from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
//import all pages and components
import { setContext } from "@apollo/client/link/context";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TutorSignup from "./pages/TutorSignup";
import TutorDetail from "./pages/TutorDetail";
import StudentSignup from "./pages/StudentSignup";
import Header from "./components/Header";
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import TutorProfile from "./pages/TutorProfile";
import ChatDetail from "./pages/ChatDetail";
import StudentProfile from "./pages/StudentProfile";
import hero1 from "../src/assets/hero.jpeg";
import Features from "./pages/Features";

// import Tutor from "./components/Tutor";
// import { QUERY_TUTORS } from "./utils/queries";
// import { useQuery } from "@apollo/client";
// import SearchBar from "./components/SearchBar";

const httpLink = createHttpLink({
  uri: "/graphql",
});
//create authentication link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// create a cleint server
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//Build the application
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className='bg-light'
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${hero1})`,
            backgroundSize: "cover",
          }}
        >
          <Header />
          <Container className='pb-3'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Home logout={true} />} />
              <Route path='/features' element={<Features />} />
              <Route path='/student-signup' element={<StudentSignup />} />
              <Route path='/student-profile' element={<StudentProfile />} />
              <Route path='/tutor-signup' element={<TutorSignup />} />
              <Route path='/tutor/:id' element={<TutorDetail />} />
              <Route path='/tutor-profile' element={<TutorProfile />} />
              <Route path='/chat/:id' element={<ChatDetail />} />

              <Route path='*' element={<NoMatch />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
