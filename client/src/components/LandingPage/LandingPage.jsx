// Node Modules ============================================================ //
import React, { useCallback, useState } from 'react';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'helpers/auth';
// Styles ================================================================== //
import './LandingPage.module.scss';
// My Components =========================================================== //
import Header from './components/Header';
import Banner from './components/Banner';
import Introduction from './components/Introduction';
import Student from './components/Student';
import Admin from './components/Admin';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from 'components/common/modal/ConfirmationModal/ConfirmationModal';

// ===========================|| LANDING PAGE ||============================ //
const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState(LOGIN_STEPS.CHOOSE_OPTIONS);

  const openLoginModalHandler = useCallback((step) => {
    setShowLogin(true);
    setLoginStep(step);
  }, []);

  const closeLoginModalHandler = useCallback(() => {
    setShowLogin(false);
  }, []);

  return (
    <React.Fragment>
      <Header onOpenLogin={openLoginModalHandler} />
      <Banner />
      <Introduction />
      <Student onOpenLogin={openLoginModalHandler} />
      <Admin onOpenLogin={openLoginModalHandler} />
      <Contact />
      <Footer />
      <LoginModal
        visible={showLogin}
        step={loginStep}
        onClose={closeLoginModalHandler}
      />
    </React.Fragment>
  );
};

export default Landing;
