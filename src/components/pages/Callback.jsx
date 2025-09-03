import React, { useEffect } from 'react'

const Callback = () => {
  useEffect(() => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showSSOVerify("#authentication-callback");
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div id="authentication-callback"></div>
    </div>
  )
}

export default Callback