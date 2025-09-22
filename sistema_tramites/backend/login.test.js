const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('./index');

describe('Login endpoint', () => {
  it('debe rechazar login sin datos', async () => {
    const res = await request(app).post('/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Faltan datos');
  });

  it('debe rechazar usuario inexistente', async () => {
    const res = await request(app).post('/login').send({ username: 'noexiste@email.com', password: '1234' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Usuario no encontrado');
  });

  it('debe rechazar contraseña incorrecta', async () => {
    // Suponiendo que existe el usuario 'admin@email.com' con password 'adminpass'
    const res = await request(app).post('/login').send({ username: 'admin@email.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Contraseña incorrecta');
  });

  it('debe permitir login admin', async () => {
    const res = await request(app).post('/login').send({ username: 'admin@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('admin');
  });

  it('debe permitir login empleado_n1', async () => {
    const res = await request(app).post('/login').send({ username: 'emp1@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('empleado_n1');
  });

  it('debe permitir login empleado_n2', async () => {
    const res = await request(app).post('/login').send({ username: 'emp2@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('empleado_n2');
  });

  it('debe permitir login empleado_n3', async () => {
    const res = await request(app).post('/login').send({ username: 'emp3@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('empleado_n3');
  });

  it('debe permitir login solicitante', async () => {
    const res = await request(app).post('/login').send({ username: 'sol1@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('solicitante');
  });

  it('debe permitir login invitado', async () => {
    // Agrega este usuario en tu seed si no existe
    const res = await request(app).post('/login').send({ username: 'invitado@guest.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('guest');
  });

  it('debe permitir login user', async () => {
    // Agrega este usuario en tu seed si no existe
    const res = await request(app).post('/login').send({ username: 'user@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('user');
  });

  it('debe permitir login para otro solicitante', async () => {
    const res = await request(app).post('/login').send({ username: 'sol2@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('solicitante');
  });

  it('debe permitir login para otro empleado', async () => {
    const res = await request(app).post('/login').send({ username: 'emp4@burokratilo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('empleado_n1');
  });
});
