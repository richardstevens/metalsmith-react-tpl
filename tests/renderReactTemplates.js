import chai from 'chai';
import chaiLint from 'chai-lint';
chai.use( chaiLint );
const { expect } = chai;
import renderReactTemplates from '../lib/renderReactTemplates';
import path from 'path';
const file = path.join( __dirname, 'fixtures', 'dummy.jsx' );

describe('renderReactTemplates', function( ) {
  it('returns stuff', function( done ) {
    const cb = ( err, result ) => {
      expect( err ).to.equal( null );
      expect( result ).to.be.a( 'string' );
      done( );
    };
    renderReactTemplates( file, undefined, undefined, cb );
    renderReactTemplates( file, undefined, undefined, undefined );
  });
  it('returns stuff with everything passed in', function( done ) {
    const cb = ( err, result ) => {
      expect( err ).to.equal( null );
      expect( result ).to.be.a( 'string' );
      done( );
    };
    renderReactTemplates( file, { text: 'bar foo' }, { isStatic: false }, cb );
  });
  it('returns error if not valid', function( done ) {
    const cb = ( err, result ) => {
      expect( err ).to.not.equal( null );
      expect( result ).to.equal( undefined );
      done( );
    };
    renderReactTemplates( null, { text: 'bar foo' }, { isStatic: false }, cb );
  });
});
