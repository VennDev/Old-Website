// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

const ForgetPassword = () => {
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/images/brand/logo/Contact icon 3d vector illustration.jpg"
                  className="mb-2"
                  alt=""
                />
              </Link>
              <p className="mb-6">
                Đừng lo lắng, chỉ cần nhập email của bạn và chúng tôi sẽ gửi
              </p>
            </div>
            {/* Form */}
            <Form>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                />
              </Form.Group>
              {/* Button */}
              <div className="mb-3 d-grid">
                <Button variant="primary" type="submit">
                  Thiết lập lại mật khẩu
                </Button>
              </div>
              <span>
                Không có tài khoản?{" "}
                <Link href="/authentication/sign-in">Đăng Nhập</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
