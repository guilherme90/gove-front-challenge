import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gove',
  description: '',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <>
        <Navbar bg="dark" fixed="top" data-bs-theme="dark" className="shadow-sm">
          <Container>
            <NavbarBrand>Gove</NavbarBrand>
          </Container>
        </Navbar>
        <Container className="pt-3">{children}</Container>
      </>
    </body>
    </html>
  )
}
