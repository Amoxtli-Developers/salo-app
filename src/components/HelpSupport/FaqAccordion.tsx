"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Extended FAQ dummy data
const faqData = [
  {
    question: "¿Cómo registro un nuevo ajolote?",
    answer:
      "Para registrar un nuevo ajolote, dirígete a la sección 'Mis Axolotls' y haz clic en 'Registrar Nuevo Axolote'. Completa el formulario y envía la información.",
    category: "Registro y Gestión de Ajolotes",
  },
  {
    question: "¿Cómo edito o elimino un ajolote?",
    answer:
      "En la sección 'Mis Axolotls', cada registro tiene opciones para editar o eliminar. Haz clic en el ícono de acciones para ver las opciones disponibles.",
    category: "Registro y Gestión de Ajolotes",
  },
  {
    question: "¿Qué significan los distintos estados de alerta?",
    answer:
      "Los estados de alerta indican la situación de cada aviso. 'Pendiente' significa que la alerta aún requiere atención, mientras que 'Atendida' indica que ya fue resuelta.",
    category: "Alertas y Notificaciones",
  },
  {
    question: "¿Cómo puedo exportar los datos?",
    answer:
      "Puedes exportar la lista de alertas o ajolotls mediante el botón de exportación ubicado en la parte superior de cada sección.",
    category: "Reportes y Análisis",
  },
  {
    question: "¿Qué hago si encuentro un error en el sistema?",
    answer:
      "Si encuentras un error, por favor contacta a nuestro equipo de soporte mediante el formulario en la sección de Soporte Técnico.",
    category: "Soporte Técnico",
  },
  {
    question: "¿Cuáles son los tiempos de respuesta del equipo de soporte?",
    answer:
      "Nuestro equipo de soporte se compromete a responder en un plazo de 24 a 48 horas, dependiendo de la complejidad del problema.",
    category: "Soporte Técnico",
  },
];

const FaqAccordion: React.FC = () => {
  return (
    <Box>
      {faqData.map((faq, index) => (
        <Accordion key={index} defaultExpanded={index === 0} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
          {index < faqData.length - 1 && <Divider />}
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqAccordion;
