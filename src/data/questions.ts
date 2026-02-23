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
        enemyName: "La Araña Embobadora",
        question: "¿Cuál de los siguientes no es un pilar de la observabilidad en SETI?",
        options: ["Throughput", "Logs", "Métricas", "Trazas"],
        correctOptionIndex: 0,
        feedback: {
            success: "¡Correcto! No te dejaste embobar de la araña",
            failure: "¡Cuidado! La Araña de la Latencia te ha embobado."
        }
    },
    {
        id: 2,
        enemyName: "El Grillo de los silos",
        question: "Cuál de estas no es una capa de instrumentación en observabilidad?",
        options: ["Infraestructura", "Aplicación", "Memoria Ram", "Experiencia del usuario"],
        correctOptionIndex: 2,
        feedback: {
            success: "¡Exacto! La memoria RAM no es una capa de instrumentación",
            failure: "El grillo es el que está cantando porque no pusiste atención."
        }
    },
    {
        id: 3,
        enemyName: "La Abeja de eBPF",
        question: "Cuál de estos es el estandar para la instrumentación de aplicaciones en observabilidad?",
        options: ["Grafana", "Zabbix", "DataDog", "OpenTelemetry"],
        correctOptionIndex: 3,
        feedback: {
            success: "¡Picadura evitada! OpenTelemetry es el estandar para la instrumentación de aplicaciones en observabilidad.",
            failure: "¡Ouch! La abeja de eBPF te ha picado. OpenTelemetry es el estandar para la instrumentación de aplicaciones en observabilidad."
        }
    },
    {
        id: 4,
        enemyName: "La Avispa malévola",
        question: "Cual de las siguientes es una ventaja de instrumentar con OpenTelemetry",
        options: ["Evitar el Vendor Lock-in", "No necesitar servidores", "No necesitar bases de datos", "No necesitar capacidades de computo"],
        correctOptionIndex: 0,
        feedback: {
            success: "¡Plas! Has acabado con la avispa malévola.",
            failure: "La avispa malévola te ha picado. ¡Cuidado con el Vendor Lock-in!"
        }
    },
    {
        id: 5,
        enemyName: "La Cucaracha que ya no puede caminar",
        question: "Un evento representa un dato númerico en un momento del tiempo, ¿Que puedes decir de esa afirmación?",
        options: ["Es verdadera", "Es falsa, un evento es como un log con más contexto", "Es parcialmente verdadera, porque si es numérica", "Es parcialmente falsa, porque es en el tiempo"],
        correctOptionIndex: 1,
        feedback: {
            success: "¡Bien hecho! Un evento es como un log pero enriquecido con metadata.",
            failure: "La cucaracha se te metió en la ropa interior."
        }
    },
    {
        id: 6,
        enemyName: "La Mariquita de la Fatiga",
        question: "Cuál de las siguientes opciones describe mejor el concepto de 'Fatiga de Alertas'?",
        options: ["Es cuando una alerta es cansona", "Cuando el alertamiento no es efectivo", "Es cuando las alertas no implican un accionable", "Es cuando me llama mi amá"],
        correctOptionIndex: 2,
        feedback: {
            success: "Bien dicho! Las alertas que no implican un accionable son ruido.",
            failure: "Te zumba la mariquita, más mariquita el que no arregla las alertas."
        }
    },
    {
        id: 7,
        enemyName: "El Zancudo de las señales doradas",
        question: "Cuál de las respuesta tiene las verdaderas y famosas señales doradas?",
        options: ["Tráfico, Latencia, Errores y CPU", "Latencia, Errores, Tiempo de respuesta y Saturación", "CPU, Memoria, Disco y Red", "Latencia, Errores, Trafico, Saturación"],
        correctOptionIndex: 3,
        feedback: {
            success: "¡Aniquilaste el Zancudo! si sabes cuáles son las 'Golden Signals'.",
            failure: "El zancudo te picó, las golden signals son Latencia, Errores, Trafico y Saturación."
        }
    },
    {
        id: 8,
        enemyName: "Cucarrón M13rd3r0",
        question: "Existe un método para instrumentar aplicaciones en linux y k8s sin modificar el código fuente, cuál de los siguientes es?",
        options: ["Cloud Control", "eBPF", "Grafana", "Zabbix"],
        correctOptionIndex: 0,
        feedback: {
            success: "¡Excelente! eBPF es una tecnología que permite ejecutar código personalizado en el kernel de Linux sin modificar el código fuente de las aplicaciones.",
            failure: "¡Te dioo! El Cucarrón M13rd3r0 te ha dado duro."
        }
    },
    {
        id: 9,
        enemyName: "La Mantis de la Configuración",
        question: "Una nueva versión se despliega y todo se rompe, aunque el código está bien. Un valor en una variable de entorno estaba vacío. ¿Cómo ayuda la observabilidad aquí?",
        options: ["Registrando eventos de despliegue y cambios de configuración", "Ignorando las variables de entorno", "Apagando el servidor", "Aumentando la memoria RAM"],
        correctOptionIndex: 0,
        feedback: {
            success: "¡Desplegaste la red correcta! Correlacionar eventos de CI/CD es observabilidad avanzada.",
            failure: "La Mantis ha atacado al heroe..."
        }
    },
    {
        id: 10,
        enemyName: "El Zapato mata hormigas",
        question: "Los usuarios finales de una aplicación reportan que la aplicación está lenta, el cliente dice que es un problema en la base de datos, pero los logs no muestran errores. ¿Cuál de los pilares de la observabilidad te ayudaría a identificar el problema?",
        options: ["Métricas", "Logs", "Trazas", "Todas las anteriores"],
        correctOptionIndex: 2,
        feedback: {
            success: "¡No quedaste como un zapato! Las trazas te ayudarían a identificar desde la aplicación hasta la base de datos el problema.",
            failure: "¡Quedaste como un zapato! Las trazas te ayudarían a identificar desde la aplicación hasta la base de datos el problema."
        }
    }
];
