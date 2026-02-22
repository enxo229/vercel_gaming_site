export interface Question {
    id: number;
    enemyName: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    feedback: {
        success: string;
        failure: string;
    };
}

export const GAME_QUESTIONS: Question[] = [
    {
        id: 1,
        enemyName: "La Araña de la Latencia",
        question: "¿Qué métrica es fundamental para medir cuánto tarda una solicitud en ser procesada antes de devolver un error por timeout?",
        options: ["Throughput", "Latencia", "Tasa de errores", "Saturación"],
        correctOptionIndex: 1,
        feedback: {
            success: "¡Correcto! Has esquivado la telaraña de la latencia.",
            failure: "¡Cuidado! La Araña de la Latencia te ha atrapado en sus retrasos."
        }
    },
    {
        id: 2,
        enemyName: "El Grillo del Silo de Datos",
        question: "Si tienes tus logs en una herramienta, las métricas en otra, y las trazas en otra sin conexión entre ellas, ¿qué problema de observabilidad enfrentas?",
        options: ["Falta de Alta Disponibilidad", "Silos de Datos", "Alerta Fatigada", "Fuga de Memoria"],
        correctOptionIndex: 1,
        feedback: {
            success: "¡Exacto! Centralizar la información es clave para correlacionar problemas.",
            failure: "El grillo sigue cantando en su rincón aislado. Necesitamos romper esos silos."
        }
    },
    {
        id: 3,
        enemyName: "La Abeja del Error 500",
        question: "Un cliente reporta un Error '500 Internal Server Error'. ¿Cuál de los siguientes pilares de la observabilidad es el primer lugar donde buscar un 'Stack Trace'?",
        options: ["Métricas (CPU/RAM)", "Logs (Registros)", "Traces (Trazas)", "Dashboards Financieros"],
        correctOptionIndex: 1,
        feedback: {
            success: "¡Picadura evitada! Los logs son fundamentales para errores de código específicos.",
            failure: "¡Ouch! La abeja del 500 te ha picado. Los logs tienen la respuesta."
        }
    },
    {
        id: 4,
        enemyName: "El Mosquito de la Fuga de Memoria",
        question: "Tu aplicación web se reinicia silenciosamente cada pocas horas. Las métricas muestran un aumento constante de RAM antes de caer. ¿Qué está ocurriendo?",
        options: ["Ataque DDoS", "Cuello de botella en red", "Fuga de Memoria (Memory Leak)", "Base de datos caída"],
        correctOptionIndex: 2,
        feedback: {
            success: "¡Plas! Has aplastado al mosquito chupa-memoria.",
            failure: "El mosquito ha drenado toda tu RAM. ¡Vigila el uso de memoria!"
        }
    },
    {
        id: 5,
        enemyName: "La Cucaracha del Cuello de Botella",
        question: "La API responde lento, pero la CPU de la app está al 10%. ¿Qué herramienta te ayudaría mejor a descubrir que una consulta SQL específica en la BD es lenta?",
        options: ["Logs del balanceador de carga", "Métricas del disco de la App", "Tracing Distribuido", "Ping a la base de datos"],
        correctOptionIndex: 2,
        feedback: {
            success: "¡Bien hecho! El Tracing permite ver el flujo completo y detectar qué paso es lento.",
            failure: "La cucaracha se ha escondido en la base de datos. Tracing es la solución."
        }
    },
    {
        id: 6,
        enemyName: "La Avispa de la Falsa Alarma",
        question: "Recibes 100 correos de alerta por hora de que el CPU está al 75%, pero el servicio funciona perfectamente. ¿Qué concepto de SRE estás violando?",
        options: ["SLAs", "Seguimiento de Errores", "Fatiga de Alertas (Alert Fatigue)", "Monitoreo Sintético"],
        correctOptionIndex: 2,
        feedback: {
            success: "¡Despejado! Ajustar los umbrales evita la fatiga de alertas.",
            failure: "Zumbidos constantes de alertas ignoradas. ¡Cuidado con la fatiga!"
        }
    },
    {
        id: 7,
        enemyName: "La Hormiga Roja del Tráfico Alto",
        question: "Tu sitio de e-commerce lanza una oferta y el número de requests por segundo (Throughput) se multiplica por 10. ¿Qué métrica de oro (Golden Signals) indica este volumen?",
        options: ["Tráfico (Traffic / Rate)", "Latencia (Latency)", "Errores (Errors)", "Saturación (Saturation)"],
        correctOptionIndex: 0,
        feedback: {
            success: "¡Resististe la invasión! Medir el tráfico entrante es esencial.",
            failure: "Las hormigas rojas sobresaturaron tu servidor."
        }
    },
    {
        id: 8,
        enemyName: "La Oruga del Downtime",
        question: "Has prometido a tus clientes que tu servicio estará disponible el 99.9% del tiempo este mes. ¿A qué concepto de SRE corresponde esta promesa?",
        options: ["SLI (Service Level Indicator)", "SLO (Service Level Objective) / SLA", "Error Budget", "MTTR (Mean Time to Repair)"],
        correctOptionIndex: 1,
        feedback: {
            success: "¡Protegiste tus acuerdos de Service Level!",
            failure: "La oruga se comió tu presupuesto de errores (Error Budget)."
        }
    },
    {
        id: 9,
        enemyName: "La Polilla de la Configuración",
        question: "Una nueva versión se despliega y todo se rompe, aunque el código está bien. Un valor en una variable de entorno estaba vacío. ¿Cómo ayuda la observabilidad aquí?",
        options: ["Registrando eventos de despliegue y cambios de configuración", "Ignorando las variables de entorno", "Apagando el servidor", "Aumentando la memoria RAM"],
        correctOptionIndex: 0,
        feedback: {
            success: "¡Desplegaste la red correcta! Correlacionar eventos de CI/CD es observabilidad avanzada.",
            failure: "La polilla oscureció tus variables de entorno..."
        }
    },
    {
        id: 10,
        enemyName: "El Escarabajo del Nodo Caído",
        question: "El servidor principal se apaga abruptamente (Crash). ¿Qué métrica te indicaría la capacidad restante de tu clúster tras el fallo?",
        options: ["Latencia P99", "Tráfico entrante", "Saturación (Saturation)", "Resolución de DNS"],
        correctOptionIndex: 2,
        feedback: {
            success: "¡Victoria Absoluta! Entender la saturación evita fallos en cascada.",
            failure: "El Escarabajo hizo colapsar el resto de tus nodos por sobrecarga."
        }
    }
];
