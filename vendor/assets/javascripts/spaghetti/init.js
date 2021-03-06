$(function() {
  function nearBottomOfPage() {
    var nearBottom = $(window).scrollTop() > $('#spaghetti-bottom-anchor').offset().top - $(window).height();
    return nearBottom;
  }

  function triggerHooks(hook) {
    fn = hook + '_spaghetti';
    if (typeof window[fn] != 'undefined') {
      fireHook(fn);
    }
  }

  function fireHook(func){
    this[func].apply(this, Array.prototype.slice.call(arguments, 1));
  }

  $('.spaghetti-empty').each(function() {
    $(this).data('spaghetti-enabled', 0);
    $(this).removeClass('spaghetti-empty');
    $(this).addClass('spaghetti-loading');
    if($(this).data('spaghetti-url').indexOf("?") === -1){
        pageParameter = '?page=';
    }else{
        pageParameter = '&page=';
    }
    $.ajax({
      url: $(this).data('spaghetti-url') + pageParameter + $(this).data('spaghetti-next-page'),
      type: 'get',
      dataType: 'script',
      success: function() {
        triggerHooks('post');
      }
    });
  });

  $(window).scroll(function(){
    if ($('.spaghetti').data('spaghetti-enabled') == 1) {
      if(nearBottomOfPage()) {
        triggerHooks('pre');
        $('.spaghetti').data('spaghetti-enabled', 0);
        $('.spaghetti').addClass('spaghetti-loading');
        if($('.spaghetti').data('spaghetti-url').indexOf("?") === -1){
        	pageParameter = '?page=';
    	}else{
        	pageParameter = '&page=';
    	}
        $.ajax({
          url: $('.spaghetti').data('spaghetti-url') + pageParameter + $('.spaghetti').data('spaghetti-next-page'),
          type: 'get',
          dataType: 'script',
          success: function() {
            $(window).sausage('draw');
            triggerHooks('post');
          }
        });
      }
    }
  });
  $(window).sausage();
});