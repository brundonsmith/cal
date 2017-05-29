
import React from 'react';
import Model from 'mutable-model';
import api from 'js/api';

import Nav from '../Nav';

import NotePreview from './NotePreview';
import NoteFull from './NoteFull';

class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      searchString: '',
      listOpen: false,
      selectedNoteIndex: 0,
      notes: [ ],
    });
	}

  componentDidMount() {
    this.refreshNotes();
  }

  render() {
    return (
      <div className={`component-notes ${this.model.listOpen ? 'list-open' : ''}`}>
        <Nav
          title="Notes"
          onMenuButtonClick={() => {
            this.model.listOpen = !this.model.listOpen;
            if(this.model.listOpen) {
              this.refreshNotes();
            }
          }}
          searchValue={this.model.searchString}
          onSearchChange={(val) => {
            this.model.searchString = val;
            this.model.listOpen = true;
          }} />

        <div className="main-container">
          <div className="notes-list">
            <div className="new-note" onClick={this.handleCreateNoteButtonClick.bind(this)}>
              <i className="material-icons">add_circle_outline</i>
              New note
            </div>
            {this.model.notes
              .map((note, index) =>
                note.content.toLowerCase().includes(this.model.searchString.toLowerCase()) ?
                  <NotePreview note={note} key={note._id} onSelect={(note) => {
                      this.model.selectedNoteIndex = index;
                      this.model.listOpen = false;
                      this.clearEmptyNotes();
                    }} />
                : null
              )}
          </div>
          <div className="current-note" onClick={() => this.model.listOpen = false}>
            {this.model.notes[this.model.selectedNoteIndex] ?
              <NoteFull note={this.model.notes[this.model.selectedNoteIndex]} />
            : null }
          </div>
        </div>
      </div>
    );
	}

  handleCreateNoteButtonClick() {
    api.note.createNote({
        content: '',
        date: new Date().valueOf(),
      })
      .then(() => {
        this.refreshNotes();
        this.model.listOpen = false;
        this.model.selectedNoteIndex = 0;
      });
  }

  refreshNotes() {
    return api.note.getAllNotes()
      .then((notes) => {
        this.model.notes = notes;
      });
  }

  clearEmptyNotes() {
    //TODO: delet empty notes
  }

}

export default Notes;
