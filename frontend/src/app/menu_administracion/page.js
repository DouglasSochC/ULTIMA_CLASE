'use client'
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { usePathname, useRouter } from 'next/navigation';

function MenuAdministracion() {

    const pathname = usePathname();
    const router = useRouter();
    console.log(router.pathname);

    useEffect(() => {
        const url = `${pathname}`
        console.log(url)
        // You can now use the current URL
        // ...
      }, [pathname])
    
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Mi Tiendita</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => router.push("/")}>Pagina Principal</Nav.Link>
            <Nav.Link onClick={() => router.push(`${router.pathname}/producto`)}>Producto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuAdministracion;