import React from "react";
import { Editor } from "react-draft-wysiwyg";
import {
    EditorState,
    convertToRaw,
    convertFromHTML,
    ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Add custom styles to improve editor appearance
const editorStyles = `
    .rdw-editor-toolbar {
        border: none !important;
        margin-bottom: 0 !important;
        padding: 12px 16px !important;
        background-color: #f9fafb !important;
        border-bottom: 1px solid #e5e7eb !important;
    }
    .rdw-dropdown-wrapper,
    .rdw-option-wrapper {
        border: 1px solid #d1d5db !important;
        margin: 2px !important;
        border-radius: 6px !important;
        background-color: white !important;
    }
    .rdw-dropdown-wrapper:hover,
    .rdw-option-wrapper:hover {
        border-color: #f59e0b !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
    }
    .rdw-editor-main {
        border: none !important;
        background-color: white !important;
        min-height: 350px !important;
        padding: 16px !important;
        font-size: 16px !important;
        line-height: 1.6 !important;
        color: #374151 !important;
    }
    .rdw-editor-main h4 {
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        margin: 24px 0 12px 0 !important;
        color: #1f2937 !important;
        border-bottom: 2px solid #f59e0b !important;
        padding-bottom: 8px !important;
    }
    .rdw-editor-main p {
        margin: 12px 0 !important;
        line-height: 1.7 !important;
    }
    .rdw-editor-main ul, .rdw-editor-main ol {
        margin: 16px 0 !important;
        padding-left: 24px !important;
    }
    .rdw-editor-main li {
        margin: 8px 0 !important;
    }
    .public-DraftEditor-content {
        min-height: 300px !important;
    }
    .public-DraftEditorPlaceholder-root {
        color: #9ca3af !important;
        font-style: italic !important;
    }
`;

export default function EditorInput({ value = "", onChange }) {
    const [editorState, editorStateSet] = React.useState(
        EditorState.createEmpty(),
    );

    // Inject custom styles
    React.useEffect(() => {
        const styleId = 'custom-editor-styles';
        if (!document.getElementById(styleId)) {
            const styleSheet = document.createElement('style');
            styleSheet.id = styleId;
            styleSheet.textContent = editorStyles;
            document.head.appendChild(styleSheet);
        }
    }, []);

    React.useEffect(() => {
        onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, [editorState]);

    React.useEffect(() => {
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks,
            );
            const editorState = EditorState.createWithContent(contentState);
            editorStateSet(editorState);
        }
    }, []);

    // Enhanced toolbar configuration for better UX
    const toolbarConfig = {
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'remove', 'history'],
        inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        },
        blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
        },
        fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
        },
        list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
        },
        textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify'],
        },
        colorPicker: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
        },
        link: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link', 'unlink'],
            linkCallback: undefined,
            unlinkCallback: undefined,
        },
        remove: { className: undefined, component: undefined },
        history: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['undo', 'redo'],
        },
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <Editor
                editorState={editorState}
                toolbarClassName="bg-gray-50 border-b border-gray-200"
                wrapperClassName="min-h-[450px] bg-white"
                editorClassName="px-4 py-3 min-h-[350px] text-gray-700 leading-relaxed focus:outline-none"
                onEditorStateChange={editorStateSet}
                toolbar={toolbarConfig}
                placeholder="Start writing your blog post content here... Use H4 headings to create table of contents sections."
            />
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-t border-yellow-200 px-4 py-3">
                <div className="flex items-start space-x-2">
                    <span className="text-yellow-600 font-semibold text-lg">💡</span>
                    <div className="text-sm">
                        <p className="font-semibold text-yellow-800 mb-1">Table of Contents Tip:</p>
                        <p className="text-yellow-700 leading-relaxed">
                            Use <strong>H4 headings</strong> in your content to automatically create sections that will appear in the Table of Contents on your blog post. This helps readers navigate your content easily!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
