const Axios = require('axios');
const express = require('express');


// Middleware de auditoría
const auditMiddleware = async (req, res, next) => {

  try {
  
    const auditData = {
      operation: req.method,
      userId: req.headers['user-id'],
    };
    await Axios.post('', auditData);

    next();
    
  } catch (error) {
    console.error('Error en el middleware de auditoría:', error);
    res.status(500).json({ error: 'Error en la auditoría' });
  }
};


module.exports = {auditMiddleware};