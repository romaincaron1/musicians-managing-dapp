// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MusiciansManager is Ownable {

    // Events
    event musicianCreated(string _artistName);
    event trackAdded(string _artistName, string _title, uint _duration);
    event getTheTracks(Track[] _tracks);
    
    struct Musician {
        string _artistName;
        Track[] _tracks;
    }

    struct Track {
        string _artistName;
        string _title;
        uint _duration;
    }
    
    mapping(address => Musician) public Musicians;

    function renounceOwnership() public virtual override onlyOwner {
        revert("You cannot renounce your ownership");
    }

    function addMusician(address _musicianAddress, string memory _artistName) external onlyOwner {
        require(bytes(Musicians[_musicianAddress]._artistName).length == 0, "This musician already exists");
        Musicians[_musicianAddress]._artistName = _artistName;
        emit musicianCreated(_artistName);
    }

    function addTrack(address _musicianAddress, string memory _title, uint _duration) external onlyOwner {
        require(bytes(Musicians[_musicianAddress]._artistName).length > 0, "This musician does not exist");
        Track memory track = Track(Musicians[_musicianAddress]._artistName, _title, _duration);
        Musicians[_musicianAddress]._tracks.push(track);
        emit trackAdded(Musicians[_musicianAddress]._artistName, _title, _duration);
    }

    function getTracks(address _musicianAddress) external {
        emit getTheTracks(Musicians[_musicianAddress]._tracks);
    }
}
