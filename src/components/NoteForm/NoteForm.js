import actions from '../../redux/actions';
import store from '../../redux/store';
import Note from '../../helpers/note';
import Form from '../Form/Form';
import './NoteForm.sass';

class NoteForm extends Form {
  componentDidMount() {
    this.setState({
      name: 'NoteForm',
      fields: this.fields,
      onSubmit: this.onSubmit.bind(this),
      successMsg: 'Note saved.',
      errorMsg: 'Unable to save note.'
    });
  }

  componentDidUpdate() {
    const { downloadURL } = this.props;

    // Update fields
    if (downloadURL) this.appendImageMarkup();
    else this.updateFields(this.fields);
  }

  updatePreviewTitle(title) {
    this.props.editor.setState({ title });
  }

  updatePreviewContent(content) {
    this.props.editor.setState({ content });
  }

  get fields() {
    if (!this.note) return [];

    const { user } = this.props;

    const noteId = {
      value: this.note.noteId,
      input: {
        name: 'noteId',
        type: 'hidden'
      }
    };

    const author = {
      value: this.note.author,
      input: {
        name: 'author',
        type: 'hidden'
      }
    };

    const editor = {
      value: user.uid,
      input: {
        name: 'editor',
        type: 'hidden'
      }
    };

    const title = {
      grid: 'col-12',
      value: this.note.title,
      input: {
        label: 'Title',
        name: 'title',
        type: 'text',
        placeholder: 'Note Title',
        maxLength: 100
      },
      onChange: this.updatePreviewTitle.bind(this)
    };

    const content = {
      grid: 'col-12',
      value: this.note.content,
      input: {
        label: 'Content',
        name: 'content',
        type: 'textarea',
        placeholder: 'Something incredible...'
      },
      onChange: this.updatePreviewContent.bind(this)
    };

    const upload = {
      grid: 'col-12',
      input: {
        label: 'Upload an image',
        name: 'upload',
        type: 'file'
      }
    };

    const submit = {
      input: {
        text: 'Save',
        type: 'submit'
      }
    };

    const cancel = {
      input: {
        text: 'Cancel',
        type: 'button'
      },
      onClick: this.props.history.goBack
    };

    const deleteLink = {
      grid: 'delete',
      input: {
        text: 'Delete Note',
        type: 'link'
      },
      onClick: form => {
        Note.delete(this.note);
        this.props.history.push('/notes');
      }
    };

    let fields = [
      noteId,
      author,
      editor,
      title,
      content,
      upload,
      submit,
      cancel
    ];

    if (this.editNote) fields.push(deleteLink);

    return fields;
  }

  get note() {
    if (!this.props) return null;

    const { user, notes, match } = this.props;
    const { noteId, edit } = match.params;

    let note = null;
    this.addNote = noteId === 'add';
    this.editNote = edit === 'edit';

    // Add note
    if (this.addNote) {
      note = {
        author: user.uid,
        editor: user.uid,
        title: '',
        content: ''
      };
    }

    // Edit note
    if (this.editNote) {
      note = notes[noteId] || null;
    }

    if (note) {
      note.noteId = noteId;
    }

    return note;
  }

  appendImageMarkup() {
    const { downloadURL } = this.props;

    const fields = this.state.fields.map(field => {
      if (field.input.name === 'content') {
        field.value += `\n\n![alt text](${downloadURL})`;
      }
      return field;
    });

    this.updateFields(fields, true);

    store.dispatch(
      actions.clearFileUpload()
    );
  }

  onSubmit(POST) {
    Note.save(POST, this.props.history);
  }
}

export default NoteForm;
