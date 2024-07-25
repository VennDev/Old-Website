// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

const SignUp = () => {
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
                  width={70}
                  height={70}
                />
              </Link>
              <p className="mb-6">Hãy điền thông tin tài khoản của bạn.</p>
            </div>
            {/* Form */}
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Tên người</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Tên người dùng của bạn"
                  required=""
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  required=""
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm-password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>

              {/* Checkbox */}
              <div className="mb-3">
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    Tôi chấp nhận <Link href="#"> Điều khoản dịch vụ </Link> và{" "}
                    <Link href="#"> Chính sách bảo mật.</Link>
                  </Form.Check.Label>
                </Form.Check>
              </div>

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Đăng ký
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">
                      Bạn đã có tài khoản? Đăng nhập{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
