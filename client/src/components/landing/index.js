// Node Modules ============================================================ //
import React, { useState } from 'react';
// Constants =============================================================== //
import { LOGIN_STEPS } from 'helpers/auth';
// Styles ================================================================== //
import './index.module.scss';
// My Components =========================================================== //
import Header from './components/Header';
import Banner from './components/Banner';
import Introduction from './components/Introduction';
import Student from './components/Student';
import Admin from './components/Admin';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LoginModal } from 'components/common/modal';

// ===========================|| LANDING PAGE ||============================ //
const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState(LOGIN_STEPS.CHOOSE_OPTIONS);

  const handleOpenLoginModal = step => {
    setShowLogin(true);
    setLoginStep(step);
  };

  const handleCloseLoginModal = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Header onOpenLogin={step => handleOpenLoginModal(step)} />
      <Banner />
      <Introduction />
      <Student onOpenLogin={step => handleOpenLoginModal(step)} />
      <Admin onOpenLogin={step => handleOpenLoginModal(step)} />
      <Contact />
      <Footer />
      <LoginModal
        visible={showLogin}
        step={loginStep}
        onClose={handleCloseLoginModal}
      />
    </div>
  );
};

export default Landing;
