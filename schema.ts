type Animation =
  | 'fade'
  | 'push-left'
  | 'push-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'pop'
  | 'flip'
  | 'flow'
  | 'slide-fade'
  | null;

/**
 * Globally unique ID for the test
 */
type EventId = string;

export interface RootSchema {
  trigger: Trigger;
  object: Object;
  outcome: Outcome;
  id: EventId;
  prevId: EventId | null;
  /**
   * Timestamp of the event relative to the start of the prototype-viewer session, in ms
   */
  timestamp: number;
  [k: string]: unknown;
}

/**
 * The object that was used in triggering this event, such as a hotspot or a screen
 */
export type Object =
  | {
      type: 'hotspot' | 'overlay' | 'scrollContainer';
      id: number;
    }
  | {
      type: 'player';
    }
  | {
      type: 'screen';
      id: number;
      width: number;
      height: number;
    };
/**
 * An action that has happened as a result of this event occuring
 */
export type Outcome =
  | {
      type: 'goalReached' | 'miss' | 'startRecording' | 'stopRecording';
    }
  | {
      type: 'openUrl';
      url: string;
      newWindow: boolean;
    }
  | {
      type: 'overlayTransition';
      /**
       * The PK of the screen that is being overlain onto the currently active screen
       */
      screen: number;
      /**
       * The top left of the overlain screen
       */
      position: Coordinates;
      /**
       * The x,y coordinates of the scroll position
       */
      scrollPosition: Coordinates;
      /**
       * The animation used for the transition
       */
      animation: Animation;
      /**
       * Whether to reverse the animation or not
       */
      reverseAnimation: boolean;
    }
  | {
      type: 'removeOverlay';
      /**
       * The PK of the screen that is under the currently active overlay
       */
      screen: number;
      /**
       * The animation used for the transition
       */
      animation: Animation;
      /**
       * Whether to reverse the animation or not
       */
      reverseAnimation: boolean;
    }
  | {
      type: 'screenTransition';
      /**
       * The PK of the screen that transitioned to
       */
      screen: number;
      /**
       * The x,y coordinates of the scroll position
       */
      scrollPosition: Coordinates;
      /**
       * The animation used for the transition
       */
      animation: Animation;
      /**
       * Whether to reverse the animation or not
       */
      reverseAnimation: boolean;
    }
  | {
      type: 'resize';
      width: number;
      height: number;
    }
  | {
      type: 'scroll';
      /**
       * The PK of the screen that scrolled
       */
      screen: number | null;
      /**
       * The PK of the overlay that scrolled
       */
      overlay: number | null;
      /**
       * The x,y coordinates of the final scroll position
       */
      coords: Coordinates;
      /**
       * Whether to scroll smoothly or not
       */
      smooth: boolean;
    };

/**
 * The x,y coordinates of the interaction
 */
type Coordinates = [number, number];

/**
 * What caused the event to happen, such as user interaction or an elapsed timer
 */
type Trigger =
  | {
      type: 'tap' | 'doubletap' | 'mousemove';
      coords: Coordinates;
    }
  | {
      type: 'navigation' | 'player' | 'timer' | 'user';
    }
  | {
      type: 'pinch';
      /**
       * The direction of the pinch, either in or out
       */
      direction: 'in' | 'out';
      coords: Coordinates;
      duration: number;
    }
  | {
      type: 'swipe';
      /**
       * The general direction of the swipe
       */
      direction: 'left' | 'right' | 'up' | 'down';
      /**
       * The x,y coordinate of the starting position for the swipe
       */
      startCoords: Coordinates;
      /**
       * The x,y coordinate of the ending position for the swipe
       */
      endCoords: Coordinates;
      duration: number;
    };
