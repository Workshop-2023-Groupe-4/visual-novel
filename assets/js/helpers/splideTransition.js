import { EventInterface } from '@splidejs/splide';


export function splideTransition( Splide, Components ) {
  const { bind } = EventInterface( Splide );
  const { Move } = Components;
  const { list } = Components.Elements;

  let endCallback;

  function mount() {
    bind( list, 'transitionend', e => {
      if ( e.target === list && endCallback ) {
        // Removes the transition property
        cancel();

        // Calls the `done` callback
        endCallback();
      }
    } );
  }

  function start( index, done ) {
    const destination = Move.toPosition( index, true );

    // Applies the CSS transition
    list.style.transition = 'transform 800ms cubic-bezier(.44,.65,.07,1.01)';

    // Moves the carousel to the destination.
    Move.translate( destination );

    // Keeps the callback to invoke later.
    endCallback = done;
  }

  // Required
  function cancel() {
    list.style.transition = '';
  }

  // Optional
  function destroy() {
  }

  return {
    mount,
    start,
    cancel,
    destroy,
  };
}