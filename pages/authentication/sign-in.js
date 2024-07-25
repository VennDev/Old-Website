// import node module libraries
import {Row, Col, Card, Form, Button, Image} from "react-bootstrap";
import {createToken, setTokenCookie, getTokenCookie} from "components/server/server-helpers";
import {useForm} from 'react-hook-form';
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

const SignIn = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        const {username, password} = data;
        const payload = {
            username: username,
            password: password,
        };

        fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        const token = createToken({
                            id: data.id,
                            username: username,
                        });
                        setTokenCookie(token);
                        window.location.href = "/";
                    });
                }
            })
            .catch((error) => {
                console.error("Error logging in", error);
            });
    };

    return (
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                {/* Card */}
                <Card className="bg-transparent">
                    {/* Card body */}
                    <Card.Body className="p-6">
                        <div className="mb-4 text-center">
                            <Link href="/">
                                <Image
                                    src="/images/brand/logo/20240626_134127_0000.png"
                                    className="mb-2 mx-auto d-block rounded-circle"
                                    alt=""
                                    width={100}
                                    height={100}
                                />
                            </Link>
                            <p className="ms-1 text-white">Fill in your account information.</p>
                        </div>
                        {/* Form */}
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            {/* Username */}
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className="text-secondary">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Your username..."
                                    {...register('username', {required: true})}
                                />
                                {errors.username && <span>This field is required</span>}
                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-secondary">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="**************"
                                    {...register('password', {required: true})}
                                />
                                {errors.password && <span>This field is required</span>}
                            </Form.Group>

                            {/* Checkbox */}
                            <div className="d-lg-flex justify-content-between align-items-center mb-4">
                                <Form.Check type="checkbox" id="rememberme">
                                    <Form.Check.Input type="checkbox"/>
                                    <Form.Check.Label>Remember me</Form.Check.Label>
                                </Form.Check>
                            </div>
                            <div>
                                {/* Button */}
                                <div className="d-grid">
                                    <Button className="btn btn-secondary" variant="primary" type="submit">
                                        Login
                                    </Button>
                                </div>
                                {/*<div className="d-md-flex justify-content-between mt-4">*/}
                                {/*  <div className="mb-2 mb-md-0">*/}
                                {/*    <Link href="/authentication/sign-up" className="fs-5">*/}
                                {/*      Đăng ký một tài khoản{" "}*/}
                                {/*    </Link>*/}
                                {/*  </div>*/}
                                {/*  <div>*/}
                                {/*    <Link*/}
                                {/*      href="/authentication/forget-password"*/}
                                {/*      className="text-inherit fs-5"*/}
                                {/*    >*/}
                                {/*      Quên mật khẩu?*/}
                                {/*    </Link>*/}
                                {/*  </div>*/}
                                {/*</div>*/}
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

SignIn.Layout = AuthLayout;

export default SignIn;
