import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <Container className="py-10 text-sm text-muted">
        © {new Date().getFullYear()} Evaalasting Arm. All rights reserved.
      </Container>
    </footer>
  );
}