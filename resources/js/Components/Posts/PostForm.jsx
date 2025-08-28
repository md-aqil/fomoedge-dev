import React from "react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "../InputError";
import { Button } from "@/shadcn/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import LoadingButton from "../LoadingButton";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import SlugInput from "../SlugInput";
import { Textarea } from "@/shadcn/ui/textarea";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import InputLabel from "../InputLabel";
import ShadcnCard from "../ShadcnCard";

export default function PostForm({ post, postCategories, copyPost, userRole }) {
    console.log('PostForm received post:', post);
    console.log('PostForm received post.image:', post?.image);
    const blogBaseUrl = usePage().props.blogBaseUrl;
    const {
        data,
        setData,
        post: postAction,
        processing,
        errors,
        reset,
    } = useForm({
        title: copyPost ? copyPost?.title : post ? post?.title : "",
        category_ids: post ? post?.categories.map((c) => c.id) : [],
        slug: copyPost ? copyPost?.slug : post ? post?.slug : "",
        body: copyPost ? copyPost?.body : post ? post?.body : "",
        short_description: copyPost
            ? copyPost?.short_description
            : post
              ? post?.short_description
              : "",
        status: post ? post?.status : 0,
        meta_title: copyPost
            ? copyPost?.meta_title
            : post
              ? post?.meta_title
              : "",
        meta_description: copyPost
            ? copyPost?.meta_description
            : post
              ? post?.meta_description
              : "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (!["mentor", "admin"].includes(userRole)) {
            return;
        }

        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('Submitting form with data:', data);
        console.log('Image data type:', typeof data.image);
        console.log('Image data:', data.image);
        console.log('Image file details:', {
            name: data.image?.name,
            size: data.image?.size,
            type: data.image?.type,
            lastModified: data.image?.lastModified
        });
        console.log('Form data object:');
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'category_ids') {
                data[key].forEach(id => formData.append('category_ids[]', id));
            } else {
                formData.append(key, data[key]);
            }
        });
        
        // Log FormData contents
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        console.log('=== END FORM SUBMISSION DEBUG ===');

        const storeRouteName =
            userRole === "mentor" ? "mentors.posts.store" : "admin.posts.store";
        const updateRouteName =
            userRole === "mentor"
                ? "mentors.posts.update"
                : "admin.posts.update";

        if (post) {
            postAction(route(updateRouteName, { id: post.id }));
        } else {
            postAction(route(storeRouteName));
        }
    };

    React.useEffect(() => {
        if (!post) {
            setData("slug", textToSlug(data.title));
        } else {
            setData("title", data.title);
        }
    }, [data.title]);

    // Store form state and functions for sidebar use
    React.useEffect(() => {
        // Make form state available to parent component for sidebar
        if (typeof window !== 'undefined') {
            window.postFormState = {
                data,
                setData,
                processing,
                errors,
                submit,
                postCategories,
                blogBaseUrl,
                post
            };
        }
    }, [data, processing, errors]);

    return (
        <div className="space-y-6">
            {/* Main Form Fields */}
            <form onSubmit={submit} className="space-y-6">
                {/* Title */}
                <div>
                    <Label htmlFor="title" className="text-lg font-semibold">
                        Title
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-2 block w-full text-xl h-16 text-gray-900 font-medium"
                        placeholder="Enter your blog post title..."
                        onChange={(e) => {
                            setData("title", e.target.value);
                        }}
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                {/* Short Description */}
                <div>
                    <Label htmlFor="short_description" className="text-lg font-semibold">
                        Short Description
                    </Label>
                    <Textarea
                        id="short_description"
                        name="short_description"
                        value={data.short_description}
                        className="mt-2 block w-full min-h-[100px] text-gray-700"
                        placeholder="Write a compelling short description that summarizes your blog post..."
                        onChange={(e) => {
                            setData("short_description", e.target.value);
                        }}
                    />
                    <InputError
                        message={errors.short_description}
                        className="mt-2"
                    />
                </div>

                {/* Raw HTML Editor */}
                <div>
                    <Label htmlFor="body" className="text-lg font-semibold mb-3 block">
                        Article Content (Raw HTML)
                    </Label>
                    
                    {/* HTML Editor Guide */}
                    <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                            🎨 HTML Design Guide
                        </h4>
                        <div className="text-sm text-blue-700 space-y-2">
                            <p><strong>Use these exact HTML structures:</strong></p>
                            <div className="bg-white p-3 rounded border font-mono text-xs overflow-x-auto">
                                <div className="space-y-2">
                                    <div><span className="text-purple-600">&lt;h4&gt;</span>Your Heading<span className="text-purple-600">&lt;/h4&gt;</span></div>
                                    <div><span className="text-purple-600">&lt;p&gt;</span>Your paragraph content<span className="text-purple-600">&lt;/p&gt;</span></div>
                                    <div><span className="text-purple-600">&lt;ul&gt;</span></div>
                                    <div className="pl-4"><span className="text-purple-600">&lt;li&gt;</span>List item<span className="text-purple-600">&lt;/li&gt;</span></div>
                                    <div><span className="text-purple-600">&lt;/ul&gt;</span></div>
                                    <div><span className="text-purple-600">&lt;strong&gt;</span>Bold text<span className="text-purple-600">&lt;/strong&gt;</span></div>
                                </div>
                            </div>
                            <p className="text-blue-600">✨ The system will automatically apply the design guide styling!</p>
                        </div>
                    </div>

                    <Textarea
                        id="body"
                        name="body"
                        value={data.body}
                        className="mt-2 block w-full min-h-[500px] font-mono text-sm leading-relaxed"
                        placeholder={`Write your HTML content here...

Example:
<h4>Why Choose This Approach?</h4>
<p>This is a paragraph explaining the benefits. You can use <strong>bold text</strong> for emphasis.</p>
<ul>
  <li>First benefit point</li>
  <li>Second benefit point</li>
  <li>Third benefit point</li>
</ul>
<p>Continue with more content...</p>`}
                        onChange={(e) => {
                            setData("body", e.target.value);
                        }}
                    />
                    <InputError message={errors.body} className="mt-2" />
                    
                    {/* Preview Note */}
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            💡 <strong>Preview:</strong> Save your post and view it on the frontend to see how your HTML renders with the design guide styling.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Post form sidebar components to be used in the existing PostPage sidebar
PostForm.SidebarComponents = () => {
    const [formState, setFormState] = React.useState(null);

    // Get form state from window object
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (window.postFormState) {
                setFormState(window.postFormState);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    if (!formState) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    const { data, setData, processing, errors, postCategories, blogBaseUrl, post, submit } = formState;

    return (
        <div className="space-y-6">
            {/* URL Settings */}
            <div>
                <h4 className="text-lg font-semibold mb-3">URL Settings</h4>
                <SlugInput
                    id="slug"
                    type="text"
                    name="slug"
                    value={data.slug}
                    placeholder="slug"
                    onChange={(e) => {
                        setData("slug", e.target.value);
                    }}
                    baseUrl={blogBaseUrl}
                />
                <InputError message={errors.slug} className="mt-2" />
            </div>

            {/* Publish Settings */}
            <div>
                <h4 className="text-lg font-semibold mb-3">Publish Settings</h4>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                            defaultValue={`${data.status}`}
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="0">Draft</SelectItem>
                                    <SelectItem value="1">Publish</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    
                    {/* Save Button */}
                    <div className="pt-4">
                        <LoadingButton 
                            loading={processing} 
                            onClick={(e) => submit(e)}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            Save Post
                        </LoadingButton>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <h4 className="text-lg font-semibold mb-3">Categories</h4>
                <ScrollArea className="h-48 border p-3 rounded">
                    <ul className="space-y-2">
                        {postCategories.map((category) => (
                            <li key={category.id}>
                                <Label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={data.category_ids.includes(
                                            category.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setData(
                                                    "category_ids",
                                                    [
                                                        ...data.category_ids,
                                                        category.id,
                                                    ],
                                                );
                                            } else {
                                                setData(
                                                    "category_ids",
                                                    data.category_ids.filter(
                                                            (id) =>
                                                            id !==
                                                            category.id,
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{category.name}</span>
                                </Label>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </div>

            {/* Featured Image */}
            <div>
                <h4 className="text-lg font-semibold mb-3">Featured Image</h4>
                <Label htmlFor="image">Upload Image</Label>
                <Input
                    id="image"
                    type="file"
                    name="image"
                    className="mt-2"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        console.log('Image selected:', file);
                        setData("image", file);
                    }}
                />
                <InputError message={errors.image} className="mt-2" />
                
                {/* Image Preview */}
                {data.image && (
                    <div className="mt-3 border p-2 rounded-md">
                        <img
                            src={URL.createObjectURL(data.image)}
                            className="w-full h-32 object-cover rounded-md"
                            alt="Preview"
                            title="Image Preview"
                            loading="lazy"
                            onError={(e) => {
                                console.error('Image preview error:', e);
                                e.target.style.display = 'none';
                            }}
                        />
                        <p className="text-sm text-gray-500 mt-1">New image selected: {data.image.name}</p>
                    </div>
                )}
                
                {/* Existing Image (for edit mode) */}
                {!data.image && post && post.image && (
                    <div className="mt-3 border p-2 rounded-md">
                        <img
                            src={post.image.full_path || `/storage/${post.image.url}`}
                            className="w-full h-32 object-cover rounded-md"
                            alt={post.title}
                            title={post.title}
                            loading="lazy"
                            onError={(e) => {
                                console.error('Existing image error:', e);
                                console.log('Image path:', post.image.full_path || `/storage/${post.image.url}`);
                                e.target.style.display = 'none';
                            }}
                        />
                        <p className="text-sm text-gray-500 mt-1">Current image</p>
                    </div>
                )}
            </div>

            {/* SEO Settings */}
            <div>
                <h4 className="text-lg font-semibold mb-3">SEO Settings</h4>
                <div className="space-y-4">
                    <div>
                        <InputLabel
                            value="Meta Title"
                            additionalInfo=" (50 characters max)"
                        />
                        <Input
                            id="meta_title"
                            type="text"
                            name="meta_title"
                            value={data.meta_title}
                            className="mt-2 block w-full"
                            placeholder="SEO title"
                            onChange={(e) => {
                                setData("meta_title", e.target.value);
                            }}
                        />
                        <InputError message={errors.meta_title} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            value="Meta Description"
                            additionalInfo="(150 characters max)"
                        />
                        <Textarea
                            id="meta_description"
                            name="meta_description"
                            value={data.meta_description}
                            className="mt-2 block w-full"
                            placeholder="SEO description"
                            onChange={(e) => {
                                setData("meta_description", e.target.value);
                            }}
                        />
                        <InputError
                            message={errors.meta_description}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};