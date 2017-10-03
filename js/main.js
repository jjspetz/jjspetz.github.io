
// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

var typed = () => {
    return new Typed('.typed', {
    strings: ["Full-Stack Developer", "Hackathon Organizer", "Lifelong Learner", "Gamer", "Gym Avoider"],
    typeSpeed: 60,
    loop: true,
    loopCount: Infinity,
  });
}

var studyTime = () => {
  // calculates a rough estimate of the hours I have studied this year
  var now = new Date();
  var currentYear = now.getFullYear();
  var then = new Date("January 1, "+currentYear+" 00:00:00");
  var week = 604800000; // in miliseconds
  var studyHours = Math.round((now - then) * 45 / week);
  // document.getElementById("hrs").innerHTML = studyHours;
}

var gitCommits = function() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.jjspetseris.com/",
    "method": "GET",
  }

  $.ajax(settings).done(function (response) {
    document.getElementById("commits").innerHTML = response.commits;
  });
  }

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);
$(document).ready(studyTime);
$(document).ready(gitCommits);
$(document).ready(typed);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $(".navbar-collapse").collapse('hide');
});
