import chai from 'chai';
import chaiLint from 'chai-lint';
chai.use( chaiLint );
const { expect } = chai;
import index from '../lib/index';
import path from 'path';

const metalsmith = {
  metadata: ( ) => { return { }; },
  path: path.join
};

describe('index', function( ) {
  let options, files;
  beforeEach( ( ) => {
    files = {
      'dummy.md': {
        template: 'dummy.jsx',
        contents: '<h1>foobar</h1>'
      }
    };
    options = {
      directory: path.join( __dirname, 'fixtures' ),
      preserve: true,
      noConflict: false,
      baseFile: 'dummy.html'
    };
  });
  it('uses html baseFile', function( done ) {
    const result = index( options );
    expect( result ).to.be.a( 'function' );
    result( files, metalsmith, done );
  });
  it('uses jsx baseFile', function( done ) {
    options = {
      directory: path.join( __dirname, 'fixtures' ),
      preserve: false,
      pattern: '**/*',
      requireIgnoreExt: [ ],
      baseFile: 'dummy.jsx'
    };
    files = {
      'dummy.md': {
        rtemplate: 'dummy.jsx',
        contents: '<h1>foobar</h1>'
      }
    };
    const result = index( options );
    expect( result ).to.be.a( 'function' );
    result( files, metalsmith, done );
  });
  it('uses defaultTemplate', function( done ) {
    options = {
      directory: path.join( __dirname, 'fixtures' ),
      defaultTemplate: 'dummy.jsx',
      pattern: '**/*',
      html: false,
      requireIgnoreExt: [ 'foo', 'bar' ],
      baseFile: 'dummy.jsx'
    };
    require.extensions['bar'] = true;
    files = {
      'dummy.md': {
        contents: '<h1>foobar</h1>'
      }
    };
    const result = index( options );
    expect( result ).to.be.a( 'function' );
    result( files, metalsmith, done );
  });
  it('no options passed in', function( done ) {
    options = {
      directory: path.join( __dirname, 'templates' )
    };
    files = {
      'dummy.md': {
        contents: '<h1>foobar</h1>'
      }
    };
    require.extensions['.jsx'] = undefined;
    const result = index( options );
    expect( result ).to.be.a( 'function' );
    result( files, metalsmith, done );
  });
});
