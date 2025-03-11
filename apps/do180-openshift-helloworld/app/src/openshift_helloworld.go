package main

import (
	"fmt"
	"net/http"
	"os"
)

func helloHandler(port string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response := os.Getenv("RESPONSE")
		if len(response) == 0 {
			response = "Hello OpenShift!"
		}
		fmt.Fprintf(w, "%s (Served from port: %s)\n", response, port)
		fmt.Println("Servicing request on port", port)
	}
}

func listenAndServe(port string) {
	mux := http.NewServeMux()
	mux.HandleFunc("/", helloHandler(port))

	fmt.Printf("Serving on port %s\n", port)
	err := http.ListenAndServe(":"+port, mux)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}

func main() {
	port1 := os.Getenv("PORT")
	if len(port1) == 0 {
		port1 = "8080"
	}
	go listenAndServe(port1)

	port2 := os.Getenv("SECOND_PORT")
	if len(port2) == 0 {
		port2 = "8888"
	}
	go listenAndServe(port2)

	select {}
}