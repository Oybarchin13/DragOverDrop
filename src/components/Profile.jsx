import React, { useEffect, useState } from 'react';
import logo from "../img/logo.png"
import right from "../img/right.png"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Profile(props) {
    const { handleSubmit, register, reset } = useForm()
    const [books, setBooks] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editingIndex, setEditingIndex] = useState('')

    useEffect(() => {
        getBooks()
    }, [])
    function getBooks() {

        axios({
            url: "http://localhost:8080/books",
            method: "get"
        }).then((res) => {
            setBooks([...res.data])
        })
    }

    function mySubmit(data) {
        data.category = "New",
            data.published = new Date(),
            axios({
                url: "http://localhost:8080/books",
                method: "post",
                data: data
            }).then((res) => {
                getBooks()
            })
        handleClose()
    }

    const changeStatus = (prev) => {
        books[editingIndex].category = prev
        setEditingIndex("")
        setBooks([...books])

        axios({
            url: "http://localhost:8080/books/" + books[editingIndex].id,
            method: "patch",
            data:books[editingIndex]
        }).then((res) => {
            getBooks()
        })
    }
    const getIndex = (index) => {
        setEditingIndex(index)
    }


    return (
        <div>

            <div className="profile">
                <header className='d-flex justify-content-between py-3 px-5'>
                    <div className="header-left">
                        <div className="img">
                            <img src={logo} alt="" />
                            <div className="search"></div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="button d-flex gap-5">
                            <button className=' btn btn-dark'>Log Out</button>
                            <div className="user">
                                <img src={right} alt="" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="text px-5 py-3 text-white d-flex justify-content-between">
                    <div>
                        <h2>You`ve got <span className='text-primary'> 7 book</span>  </h2>
                        <p className='mt-3'>Your books today</p>
                    </div>
                    <div className="addd">
                        <button onClick={handleShow} className='btn btn-primary'>+ Create a book</button>
                    </div>
                </div>
                <div className="card-containerr px-5 py-3 d-flex justify-content-between gap-3">


                    <div onDragOver={(e) => e.preventDefault()} onDrop={() => {
                        return changeStatus("New")
                    }} className="card-1 d-flex flex-column gap-3">
                        <div className="d-flex flex-column gap-3" style={{ width: '28rem', minHeight: "30rem"}} >
                            {
                                books.map((v, i) => {
                                    if (v.category == "New") {
                                        return <Card key={i} draggable onDrag={() => getIndex(i)} style={{ width: '28rem' }}>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text className='' >
                                                    <p className='m-0'><span>Book Link:</span> <a href={v.bookLink}>{v.bookLink}</a> </p>
                                                    <p className='m-0'><span>Pages:</span> {v.pages} </p>
                                                    <p className='m-0'><span>Published:</span> {v.published} </p>
                                                </Card.Text>
                                                <Card.Text className='d-flex justify-content-between'>
                                                    <p className='m-0'>Eben Upton / 2012</p>
                                                    <button className='btn btn-danger'>{v.category}</button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card >
                                    }

                                })
                            }
                        </div>
                    </div>


                    <div onDragOver={(e) => e.preventDefault()} onDrop={() => {
                        return changeStatus("Reading")
                    }} className="card-2 d-flex flex-column gap-3">
                        <div className="d-flex flex-column gap-3" style={{ width: '28rem', minHeight: "30rem"}}>
                            {
                                books.map((v, i) => {
                                    if (v.category == "Reading") {
                                        return <Card key={i} draggable onDrag={() => getIndex(i)} style={{ width: '28rem' }}>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text className='' >
                                                    <p className='m-0'><span>Book Link:</span> <a href="#">{v.bookLink}</a> </p>
                                                    <p className='m-0'><span>Pages:</span> {v.pages} </p>
                                                    <p className='m-0'><span>Published:</span> {v.published} </p>
                                                </Card.Text>
                                                <Card.Text className='d-flex justify-content-between'>
                                                    <p className='m-0'>Eben Upton / 2012</p>
                                                    <button className='btn btn-warning'>{v.category}</button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card >
                                    }

                                })
                            }
                        </div>
                    </div>


                    <div onDragOver={(e) => e.preventDefault()} onDrop={() => {
                        return changeStatus("Finished")
                    }} className="card-3 d-flex flex-column gap-3">
                        <div className="d-flex flex-column gap-3" style={{ width: '28rem', minHeight: "30rem"}}>
                            {
                                books.map((v, i) => {
                                    if (v.category == "Finished") {
                                        return <Card key={i} draggable onDrag={() => getIndex(i)} style={{ width: '28rem' }}>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text className='' >
                                                    <p className='m-0'><span>Book Link:</span> <a href="#">{v.bookLink}</a> </p>
                                                    <p className='m-0'><span>Pages:</span> {v.pages} </p>
                                                    <p className='m-0'><span>Published:</span> {v.published} </p>
                                                </Card.Text>
                                                <Card.Text className='d-flex justify-content-between'>
                                                    <p className='m-0'>Eben Upton / 2012</p>
                                                    <button className='btn btn-success'>{v.category}</button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card >
                                    }

                                })
                            }
                        </div>
                    </div>

                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form" onSubmit={handleSubmit(mySubmit)}>
                            <input {...register("bookLink")} type="text" className='form-control my-3' placeholder='bookLink' />
                            <input {...register("pages")} type="text" className='form-control my-3' placeholder='Pages' />
                            <button className="btn btn-primary">Save </button>
                        </form>
                    </Modal.Body>

                </Modal>


            </div>
        </div>
    );
}

export default Profile;