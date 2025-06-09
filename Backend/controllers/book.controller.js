import Book from "../model/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


export const getAllBooks =asyncHandler( async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(new ApiResponse("Books fetched successfully", books));
    } catch (error) {
       throw new ApiError(500, "Failed to fetch books");
    }
})

export const getBookById =asyncHandler(async (req, res) => {
    const {id} = req.params;
    if (!id) {
        throw new ApiError(400, "Book ID is required");
    }
    const book= await Book.findById(id);    
    res.status(200).json(new ApiResponse("Book fetched successfully", book));
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
})

export const createBook =asyncHandler(async (req, res) => {
    const { title, author, description } = req.body;
    if (!title || !author || !description) {
        throw new ApiError(400, "All fields are required");
    }
    const book = await Book.create({ title, author, description});
    res.status(201).json(new ApiResponse("Book created successfully", book));
    if (!book) {
        throw new ApiError(500, "Failed to create book");
    }
})

export const updateBook =asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { title, author, description } = req.body;
    if (!title || !author || !description) {
        throw new ApiError(400, "All fields are required");
    }
    const book = await Book.findByIdAndUpdate(id, { title, author, description}, { new: true });
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    res.status(200).json(new ApiResponse("Book updated successfully", book));
})

export const deleteBook =asyncHandler(async (req, res) => {
    const {id} = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    res.status(200).json(new ApiResponse("Book deleted successfully", book));
})
