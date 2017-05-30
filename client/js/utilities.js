function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function loginRedirect(response) {
  if(response.status === 401) {
    window.location = `/login?redirect_url=${window.location.pathname}${window.location.hash}`;
  }

  return response;
}

export { debounce, loginRedirect };
