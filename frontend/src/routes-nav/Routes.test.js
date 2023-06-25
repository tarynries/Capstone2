import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./Routes";

test("renders homepage route", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    // Assert that the Homepage component is rendered
    expect(screen.getByText(/Evolution Recipe Planning/i)).toBeInTheDocument();
});

test("renders recipe list route", () => {
    render(
        <MemoryRouter initialEntries={["/recipes"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText(/All Recipes/i)).toBeInTheDocument();
});

test("renders recipe details route", () => {
    const recipeId = "123";
    render(
        <MemoryRouter initialEntries={[`/recipes/${recipeId}`]}>
            <AppRoutes />
        </MemoryRouter>
    );
});

test("renders gluten-free recipe list route", () => {
    render(
        <MemoryRouter initialEntries={["/recipes/gluten"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    const matchingElements = screen.queryAllByText(/Gluten-Free Recipes/i);
    expect(matchingElements.length).toBeGreaterThan(0);
});

test("renders dairy-free recipe list route", () => {
    render(
        <MemoryRouter initialEntries={["/recipes/dairy"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    const matchingElements = screen.queryAllByText(/Dairy-Free Recipes/i);
    expect(matchingElements.length).toBeGreaterThan(0);
});

test("renders main course recipe list route", () => {
    render(
        <MemoryRouter initialEntries={["/recipes/maincourse"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText(/Main Course Recipes/i)).toBeInTheDocument();
});

test("renders breakfast recipe list route", () => {
    render(
        <MemoryRouter initialEntries={["/recipes/breakfast"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    const matchingElements = screen.queryAllByText(/Breakfast Recipes/i);
    expect(matchingElements.length).toBeGreaterThan(0);
});

test("renders shopping list route", () => {
    render(
        <MemoryRouter initialEntries={["/shopping"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText(/Shopping List/i)).toBeInTheDocument();
});

test("renders joke list route", () => {
    render(
        <MemoryRouter initialEntries={["/jokes"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    const matchingElements = screen.queryAllByText(/Jokes/i);
    expect(matchingElements.length).toBeGreaterThan(0);
});

test("redirects to homepage for unknown routes", () => {
    render(
        <MemoryRouter initialEntries={["/unknown"]}>
            <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText(/Evolution Recipe Planning/i)).toBeInTheDocument();
});
