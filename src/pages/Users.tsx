import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/configureStore';
import { searchUsers } from '../store/reducers/users';

const UserList = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('christianto');
    const [currentPage, setCurrentPage] = useState(1);
    const { items: users, loading, total_page } = useSelector(
        (state: RootState) => state.users
    );

    const previousHandler = () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            setCurrentPage(page);
            dispatch(searchUsers({ username, page }));
        }
    };
    const nextHandler = () => {
        if (currentPage < total_page) {
            const page = currentPage + 1;
            setCurrentPage(page);
            dispatch(searchUsers({ username, page }));
        }
    };
    const pageHandler = (page: number) => {
        setCurrentPage(page);
        dispatch(searchUsers({ username, page }));
    };

    const pagination = (
        <div className="flex justify-center mt-4">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li
                        className={`page-item ${
                            currentPage === 1 && 'disabled'
                        }`}
                    >
                        <div
                            className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none cursor-pointer ${
                                currentPage === 1
                                    ? 'text-gray-500'
                                    : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
                            }`}
                            tabIndex={-1}
                            aria-disabled={currentPage === 1}
                            onClick={previousHandler}
                        >
                            Previous
                        </div>
                    </li>
                    {[...Array(total_page)].map((_, index) => (
                        <li key={index} className="page-item">
                            <div
                                className={`page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded cursor-pointer ${
                                    currentPage === index + 1
                                        ? 'bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
                                        : 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
                                }`}
                                onClick={() => pageHandler(index + 1)}
                            >
                                {index + 1}
                                {currentPage === index + 1 && (
                                    <span className="visually-hidden">
                                        (current)
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                    <li
                        className={`page-item ${
                            currentPage === total_page && 'disabled'
                        }`}
                    >
                        <div
                            className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded cursor-pointer focus:shadow-none ${
                                currentPage === total_page
                                    ? 'text-gray-500'
                                    : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
                            }`}
                            aria-disabled={currentPage === total_page}
                            onClick={nextHandler}
                        >
                            Next
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );

    return (
        <div className="p-4">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                <input
                    type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search Username"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && dispatch(searchUsers({ username }))
                    }
                />
                <span
                    className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded cursor-pointer"
                    id="basic-addon2"
                    onClick={() => dispatch(searchUsers({ username }))}
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="search"
                        className="w-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        ></path>
                    </svg>
                </span>
            </div>
            {loading ? (
                <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mt-4 gap-2">
                        {users.map((item) => (
                            <Link
                                key={item.id}
                                className="border rounded-md border-gray-400 p-4 cursor-pointer"
                                to={item.login}
                            >
                                <img
                                    src={item.avatar_url}
                                    className="rounded-md w-full"
                                />
                                <div className="mt-4 text-center break-all">
                                    {item.login}
                                </div>
                            </Link>
                        ))}
                    </div>
                    {users.length > 0 && pagination}
                </>
            )}
        </div>
    );
};

export default UserList;
