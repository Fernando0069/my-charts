# HelloWorld.ear

## Estructura 
```
miapp.ear/
│── miapp-ear/         (Módulo EAR - Ensambla los módulos WAR y EJB)
│   │── src/main/application.xml
│   │── pom.xml
│
│── miapp-ejb/         (Módulo EJB - Contiene lógica de negocio)
│   │── src/main/java/com/miempresa/
│   │   │── HolaEJB.java
│   │── pom.xml
│
│── miapp-web/         (Módulo WAR - Contiene Servlets y JSPs)
│   │── src/main/java/com/miempresa/
│   │   │── HelloServlet.java
│   │── src/main/webapp/
│   │   │── WEB-INF/web.xml
│   │── pom.xml
│
```

## Create package
```
mvn clean package
```