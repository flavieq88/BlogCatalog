import { render, screen } from "@testing-library/react";
import BlogForm from "../src/components/BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  test("calls onSubmit with correct details", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm />);

    const titleInput = screen.getByPlaceholderText("Title");
    const authorInput = screen.getByPlaceholderText("Author");
    const urlInput = screen.getByPlaceholderText("URL");
    const sendButton = screen.getByText("Post");

    await user.type(titleInput, "The best blog");
    await user.type(authorInput, "Me");
    await user.type(urlInput, "urlll");
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);

    expect(createBlog.mock.calls[0][0].title).toBe("The best blog");
    expect(createBlog.mock.calls[0][0].author).toBe("Me");
    expect(createBlog.mock.calls[0][0].url).toBe("urlll");
  });
});
