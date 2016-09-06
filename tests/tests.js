/* jshint jasmine: true */

exports.defineAutoTests = function () {
  var registeredProfileId,
      nrOfUserProfiles;

  describe('onegini', function () {
    it("onegini should exist", function () {
      expect(window.onegini).toBeDefined();
    });

    describe('start', function () {
      it("should exist", function () {
        expect(onegini.start).toBeDefined();
      });

      it("should run ok", function (done) {
        onegini.start(function () {
              expect(true).toBe(true);
              done();
            },
            function (err) {
              expect(err).toBeUndefined();
            });
      });
    });
  });

  describe('onegini.user', function () {
    it("should exist", function () {
      expect(onegini.user).toBeDefined();
    });

    describe("getAuthenticatedUserProfile (1/3)", function () {
      it("should exist", function () {
        expect(onegini.user.getAuthenticatedUserProfile).toBeDefined();
      });

      it("should fail", function (done) {
        onegini.user.getAuthenticatedUserProfile(
            function (result) {
              expect(result).toBeUndefined();
              done()
            },
            function (err) {
              expect(err).toBeDefined();
              expect(err.description).toBe("Onegini: No user authenticated");
              done();
            });
      });
    });

    describe("register", function () {
      it("should have a start method", function () {
        expect(onegini.user.register.start).toBeDefined();
      });

      it("should have a createPin method", function () {
        expect(onegini.user.register.createPin).toBeDefined();
      });

      describe("createPin", function () {
        it("should require a pincode argument", function () {
          expect(function () {
            onegini.user.register.createPin({}, function () {
            }, function () {
            });
          }).toThrow(new TypeError("Onegini: missing 'pin' argument for register.createPin"));
        });

        it("should require a success callback", function () {
          expect(function () {
            onegini.user.register.createPin({
              pin: "12356"
            })
          }).toThrow(new TypeError("Onegini: missing argument for method. 'createPin' requires a Success Callback"));
        });

        it("can't be called before 'start' method", function (done) {
          onegini.user.register.createPin(
              {
                pin: '12346'
              },
              function (result) {
                expect(result).toBeUndefined();
              },
              function (err) {
                expect(err).toBeDefined();
                expect(err.description).toBe("Onegini: createPin called, but no registration in progress. Did you call 'onegini.user.register.start'?");
                done();
              });
        });
      });

      describe('start', function () {
        it("should return pinlength of '5'", function (done) {
          onegini.user.register.start(
              undefined,
              function (result) {
                expect(result).toBeDefined();
                expect(result.pinLength).toBe(5);
                done();
              },
              function (err) {
                expect(err).toBeUndefined();
              });
        });

      });

      describe('createPin', function () {
        it("should return a profileId", function (done) {
          onegini.user.register.createPin(
              {
                pin: '12346'
              },
              function (result) {
                expect(result).toBeDefined();
                expect(result.profileId).toBeDefined();
                registeredProfileId = result.profileId;
                done();
              },
              function (err) {
                expect(err).toBeUndefined();
              });
        });
      });
    });

    describe("getAuthenticatedUserProfile (2/3)", function () {
      it("should succeed", function (done) {
        onegini.user.getAuthenticatedUserProfile(
            function (result) {
              expect(result).toBeDefined();
              expect(result.profileId).toEqual(registeredProfileId);
              done();
            },
            function (err) {
              expect(err).toBeUndefined();
            });
      });
    });

    describe('getUserProfiles (1/2)', function () {
      it("should exist", function () {
        expect(onegini.user.getUserProfiles).toBeDefined();
      });

      it("should not be empty", function (done) {
        onegini.user.getUserProfiles(
            function (result) {
              expect(result).toBeDefined();
              nrOfUserProfiles = result.length;
              expect(nrOfUserProfiles).toBeGreaterThan(0);
              done();
            },
            function (err) {
              expect(err).toBeUndefined();
            });
      });
    });

    describe('authenticate', function () {
      describe('start', function () {
        it("should exist", function () {
          expect(onegini.user.authenticate.start).toBeDefined();
        });

        it("should require a profileId", function () {
          expect(function() {
            onegini.user.authenticate.start()
          }).toThrow(new TypeError("Onegini: missing 'profileId' argument for authenticate.start"));
        });

        // TODO once 'logout' has been added we can test the authentication happy flow (because register already logs you in)
        it('should fail', function (done) {
          onegini.user.authenticate.start(
              {
                profileId: registeredProfileId
              },
              function (result) {
                expect(result).toBeUndefined();
              },
              function (err) {
                expect(err).toBeDefined();
                expect(err.description).toBe("Onegini: User already authenticated for the provided profileId.");
                done();
              });
        });
      });

      describe('providePin', function () {
        it("should exist", function () {
          expect(onegini.user.authenticate.providePin).toBeDefined();
        });
      });
    });

    describe('reauthenticate', function () {
      describe('start', function () {
        it("should exist", function () {
          expect(onegini.user.reauthenticate.start).toBeDefined();
        });

        it("should require a profileId", function () {
          expect(function () {
            onegini.user.reauthenticate.start()
          }).toThrow(new TypeError("Onegini: missing 'profileId' argument for reauthenticate.start"));
        });

        it('should succeed', function (done) {
          onegini.user.reauthenticate.start(
              {
                profileId: registeredProfileId
              },
              function (result) {
                expect(result).toBeDefined();
                expect(result.maxFailureCount).toBeDefined();
                expect(result.remainingFailureCount).toBeDefined();
                done();
              },
              function (err) {
                expect(err).toBeUndefined();
              });
        });

        describe('providePin', function () {
          it("should exist", function () {
            expect(onegini.user.reauthenticate.providePin).toBeDefined();
          });

          // TODO add this one to the 'authenticate' tests as well
          it("should require a pin", function () {
            expect(function () {
              onegini.user.reauthenticate.providePin()
            }).toThrow(new TypeError("Onegini: missing 'pin' argument for reauthenticate.providePin"));
          });

          it('should fail with incorrect pin', function (done) {
            onegini.user.reauthenticate.providePin(
                {
                  pin: "incorrect"
                },
                function (result) {
                  expect(result).toBeUndefined();
                },
                function (err) {
                  expect(err).toBeDefined();
                  expect(err.maxFailureCount).toBeDefined();
                  expect(err.remainingFailureCount).toBeDefined();
                  expect(err.description).toBe("Onegini: Incorrect Pin. Check the maxFailureCount and remainingFailureCount properties for details.");
                  done();
                });
          });

          it('should succeed', function (done) {
            onegini.user.reauthenticate.providePin(
                {
                  // TODO use constant
                  pin: "12346"
                },
                function () {
                  expect(true).toBe(true);
                  done();
                },
                function (err) {
                  expect(err).toBeUndefined();
                });
          });
        });
      });
    });

    describe('deregister', function () {
      it("should exist", function () {
        expect(onegini.user.deregister).toBeDefined();
      });

      it("'profileId' argument mandatory", function () {
        expect(function () {
          onegini.user.deregister({}, function () {
          }, function () {
          });
        }).toThrow(new TypeError("Onegini: missing 'profileId' argument for deregister"));
      });

      it("no user found for profileId", function (done) {
        onegini.user.deregister(
            {
              profileId: "UNKNOWN"
            },
            function (result) {
              expect(result).toBeUndefined();
            },
            function (err) {
              expect(err).toBeDefined();
              expect(err.description).toBe("Onegini: No registered user found for the provided profileId.");
              done();
            });
      });

      it("should succeed with correct profileId", function (done) {
        onegini.user.deregister(
            {
              profileId: registeredProfileId
            },
            function (result) {
              expect(result).toBeDefined();
              done();
            },
            function (err) {
              expect(err).toBeUndefined();
            });
      });
    });

    describe("getAuthenticatedUserProfile (3/3)", function () {
      it("should fail again", function (done) {
        onegini.user.getAuthenticatedUserProfile(
            function (result) {
              expect(result).toBeUndefined();
            },
            function (err) {
              expect(err).toBeDefined();
              expect(err.description).toBe("Onegini: No user authenticated");
              done();
            });
      });
    });

    describe('getUserProfiles (2/2)', function () {
      it("should be one less", function (done) {
        onegini.user.getUserProfiles(
            function (result) {
              expect(result).toBeDefined();
              expect(result.length).toBeLessThan(nrOfUserProfiles);
              done();
            },
            function (err) {
              expect(err).toBeUndefined();
            });
      });
    });

  });
};