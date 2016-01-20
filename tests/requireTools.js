import chai from 'chai';
import chaiLint from 'chai-lint';
chai.use( chaiLint );
const { expect } = chai;
import requireTools from '../lib/requireTools';
import path from 'path';
const file = path.join( __dirname, 'requireTools.js' );

describe('requireTools', function( ) {
  describe('requireIgnore', function( ) {
    it('returns null', function( ) {
      var result = requireTools.ignore( );
      expect( result ).to.equal( null );
    });
    it('still returns null even with params', function( ) {
      const result = requireTools.ignore( 'hello' );
      expect( result ).to.equal( null );
    });
  });

  describe('babelCore', function( ) {
    const module = { _compile: ( a, b ) => { a = b; return true; } };
    it('returns a function', function( ) {
      const result = requireTools.babelCore( undefined, module, file );
      expect( result ).toExist( );
      expect( requireTools.babelCore ).to.have.beenCalled( );
    });
    it('returns a function with null passed in', function( ) {
      const result = requireTools.babelCore( { }, module, file );
      expect( result ).toExist( );
      expect( requireTools.babelCore ).to.have.beenCalled( );
    });
  });
});
