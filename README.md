# Prueba Técnica HealthSync

## Objetivo
Evaluar la capacidad del candidato para desarrollar una aplicación web en **React** enfocada en el sector salud.  
La aplicación debe permitir la visualización de fichas de pacientes y sus datos de telemetría obtenidos de sensores médicos.

## Descripción
Se debe desarrollar una aplicación web en **React** que permita:

- **Listar pacientes** en una vista principal.
- **Visualizar la ficha de un paciente** al seleccionarlo, mostrando dos pestañas:
  - **Resumen de Sensores**: Información clave de los datos de telemetría del paciente.
  - **Gráfica de Sensores**: Representación visual de los valores registrados por los sensores.

## Requisitos Técnicos
- **Aplicación Web** desarrollada en **React**.
- **Listado de pacientes** con opción de selección.
- **Ficha del paciente** con dos pestañas:
  - **Resumen**: Datos relevantes del estado del paciente basado en sensores.
  - **Gráfica**: Visualización de los valores de sensores en un gráfico interactivo.

## Manejo de Datos
- Los datos de pacientes deben ser consumidos desde una API:  
  👉 [https://dummyjson.com/users](https://dummyjson.com/users)
- Los valores de sensores deben ser obtenidos de una API o estar en un CSV externo:  
  👉 [https://dummyjson.com/custom-response](https://dummyjson.com/custom-response)

## Requisitos Opcionales
- **Diseño moderno y responsivo** (uso de frameworks como **Material UI** o **Tailwind**).
- **Despliegue en Azure** para evaluar habilidades de **deployment**.
- **Uso de WebSockets o polling** para actualización en tiempo real.

## Entrega y Evaluación
- Se debe compartir el código en un **repositorio GitHub** (privado o público).