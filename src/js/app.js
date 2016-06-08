import "react-fastclick"
import index from "./index"
import admin from "./admin"

switch(window.location.pathname) {
  case "/":
  case "/index.html":
    index()
    break
  case "/admin.html":
    admin()
    break
}
